import supabase from "@/api/supabase";
import type { Tables } from "@/types/supabase";

export type Subtask = Tables<"subtasks">;

export const getSubtasks = async (arg: {
  taskId: number;
}): Promise<Subtask[]> => {
  const { taskId } = arg;
  const { data, error } = await supabase
    .from("subtasks")
    .select("*")
    .order("id", { ascending: true })
    .eq("taskId", taskId);

  if (error) throw error;
  return data;
};

export const updateSubtask = async (arg: {
  isChecked: boolean;
  subtaskId: number;
}): Promise<void> => {
  const { isChecked, subtaskId } = arg;
  const { error } = await supabase
    .from("subtasks")
    .update({ checkOrNot: isChecked })
    .eq("id", subtaskId)
    .single();

  if (error) throw error;
};
