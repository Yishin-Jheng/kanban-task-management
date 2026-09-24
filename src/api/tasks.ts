import type { Column } from "@/api/columns";
import supabase from "@/api/supabase";
import type { Tables } from "@/types/supabase";

export type Task = Tables<"tasks">;

interface SubtaskForm {
  id?: number;
  description?: string;
  checkOrNot?: boolean;
}

interface TaskForm {
  id?: number;
  title: string;
  description: string;
  columnId: number;
  subtasks?: SubtaskForm[];
}

export const getTasks = async (arg: { columnId: number }): Promise<Task[]> => {
  const { columnId } = arg;
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .order("id", { ascending: true })
    .eq("columnId", columnId);

  if (error) throw error;
  return data;
};

export const upsertTask = async (arg: TaskForm): Promise<Column["id"]> => {
  const { id, title, description, columnId, subtasks = [] } = arg;
  const validSubtasks = subtasks.flatMap((subtask) => {
    if (!subtask.description) return [];
    return [{ ...subtask, description: subtask.description }];
  });
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

export const updateTaskStatus = async (arg: {
  taskId: number;
  columnId: number;
}): Promise<void> => {
  const { taskId, columnId } = arg;
  const { error } = await supabase
    .from("tasks")
    .update({ columnId: columnId })
    .eq("id", taskId)
    .single();

  if (error) throw error;
};

export const deleteTask = async (arg: { taskId: number }): Promise<void> => {
  const { taskId } = arg;
  const { error } = await supabase
    .from("tasks")
    .delete()
    .eq("id", taskId)
    .single();

  if (error) throw error;
};
