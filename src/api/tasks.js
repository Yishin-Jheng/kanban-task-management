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
