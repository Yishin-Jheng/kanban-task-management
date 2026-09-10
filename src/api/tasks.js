import supabase from "@/store/supabase";

export const getTasks = async (arg) => {
  // FIXME: 測試用
  // await new Promise((resolve) => setTimeout(resolve, 1000));
  // throw new Error("getTasks failed");

  const { columnId } = arg;
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .order("id", { ascending: true })
    .eq("columnId", columnId);

  if (error) throw error;
  return data;
};

export const upsertTask = async (arg) => {
  // FIXME: 測試用
  // await new Promise((resolve) => setTimeout(resolve, 1000));
  // throw new Error("createTask failed");

  const { taskId, title, description, columnId, subtasks = [] } = arg;
  const { error } = await supabase.rpc("upsert_task_with_subtasks", {
    pTaskId: taskId ?? null,
    pTitle: title,
    pDescription: description,
    // FIXME: 等Dropdown的資料不一致問題修好再移除67的預設值
    pColumnId: columnId ?? 67,
    pSubtasks: subtasks.map((subtask) => ({
      id: subtask.id ?? null,
      description: subtask.description,
      checkOrNot: subtask.checkOrNot ?? false,
    })),
  });

  if (error) throw error;
};

export const updateTaskStatus = async (arg) => {
  // FIXME: 測試用
  // await new Promise((resolve) => setTimeout(resolve, 1000));
  // throw new Error("updateTask failed");

  const { taskId, columnId } = arg;
  const { error } = await supabase
    .from("tasks")
    .update({ columnId: columnId })
    .eq("id", taskId)
    .single();

  if (error) throw error;
};

export const deleteTask = async (arg) => {
  // FIXME: 測試用
  // await new Promise((resolve) => setTimeout(resolve, 1000));
  // throw new Error("deleteTask failed");

  const { taskId } = arg;
  const { error } = await supabase
    .from("tasks")
    .delete()
    .eq("id", taskId)
    .single();

  if (error) throw error;
};
