import supabase from "@/api/supabase";

export const getColumns = async (arg) => {
  const { boardId } = arg;
  const { data, error } = await supabase
    .from("columns")
    .select("*")
    .order("id", { ascending: true })
    .eq("boardId", boardId);

  if (error) throw error;
  return data;
};
