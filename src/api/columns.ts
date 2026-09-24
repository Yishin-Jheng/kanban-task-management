import supabase from "@/api/supabase";
import type { Tables } from "@/types/supabase";

export type Column = Tables<"columns">;

export const getColumns = async (arg: {
  boardId: number;
}): Promise<Column[]> => {
  const { boardId } = arg;
  const { data, error } = await supabase
    .from("columns")
    .select("*")
    .order("id", { ascending: true })
    .eq("boardId", boardId);

  if (error) throw error;
  return data;
};
