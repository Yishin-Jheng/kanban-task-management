import supabase from "@/store/supabase";

export const getSubtasks = async (arg) => {
  // FIXME: 測試用
  // await new Promise((resolve) => setTimeout(resolve, 1000));
  // throw new Error("getSubtasks failed");

  const { taskId } = arg;
  const { data, error } = await supabase
    .from("subtasks")
    .select("*")
    .order("id", { ascending: true })
    .eq("taskId", taskId);

  if (error) throw error;
  return data;
};

export const updateSubtask = async (arg) => {
  // FIXME: 測試用
  // await new Promise((resolve) => setTimeout(resolve, 1000));
  // throw new Error("updateSubtask failed");

  const { isChecked, subtaskId } = arg;
  const { error } = await supabase
    .from("subtasks")
    .update({ checkOrNot: isChecked })
    .eq("id", subtaskId)
    .single();

  if (error) throw error;
};
