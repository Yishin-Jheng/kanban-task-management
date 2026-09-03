import supabase from "@/store/supabase";

export const getColumns = async (arg) => {
  // FIXME: 測試用
  // await new Promise((resolve) => setTimeout(resolve, 1000));
  // throw new Error("getColumns failed");

  const { boardId } = arg;
  const { data, error } = await supabase
    .from("columns")
    .select("*")
    .order("id", { ascending: true })
    .eq("boardId", boardId);

  if (error) throw error;
  return data;
};
