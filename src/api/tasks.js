import supabase from "@/store/supabase";

export const getTasks = async (arg) => {
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
  const { id, title, description, columnId, subtasks = [] } = arg;
  const validSubtasks = subtasks.filter((subtask) => subtask.description);
  const { data, error } = await supabase.rpc("upsert_task_with_subtasks", {
    pTaskId: id ?? null,
    pTitle: title,
    pDescription: description,
    pColumnId: columnId,
    pSubtasks: validSubtasks.map((subtask) => ({
      id: subtask.id ?? null,
      description: subtask.description,
      checkOrNot: subtask.checkOrNot ?? false,
    })),
  });

  if (error) throw error;
  return data;
};

export const updateTaskStatus = async (arg) => {
  const { taskId, columnId } = arg;
  const { error } = await supabase
    .from("tasks")
    .update({ columnId: columnId })
    .eq("id", taskId)
    .single();

  if (error) throw error;
};

export const deleteTask = async (arg) => {
  const { taskId } = arg;
  const { error } = await supabase
    .from("tasks")
    .delete()
    .eq("id", taskId)
    .single();

  if (error) throw error;
};
