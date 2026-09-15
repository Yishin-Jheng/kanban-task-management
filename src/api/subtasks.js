import supabase from "@/api/supabase";

export const getSubtasks = async (arg) => {
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
  const { isChecked, subtaskId } = arg;
  const { error } = await supabase
    .from("subtasks")
    .update({ checkOrNot: isChecked })
    .eq("id", subtaskId)
    .single();

  if (error) throw error;
};
