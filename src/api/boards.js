import supabase from "@/store/supabase";

export const getBoards = async () => {
  // FIXME: 測試用
  // await new Promise((resolve) => setTimeout(resolve, 1000));
  // throw new Error("getBoards failed");

  const { data, error } = await supabase
    .from("boards")
    .select("*")
    .order("id", { ascending: true });

  if (error) throw error;
  return data;
};

export const deleteBoard = async (arg) => {
  // FIXME: 測試用
  // await new Promise((resolve) => setTimeout(resolve, 1000));
  // throw new Error("deleteBoard failed");

  const { boardId } = arg;
  const { error } = await supabase
    .from("boards")
    .delete()
    .eq("id", boardId)
    .single();

  if (error) throw error;
};
