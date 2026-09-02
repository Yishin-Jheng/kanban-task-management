import supabase from "@/store/supabase";

export const getBoards = async () => {
  // FIXME: 測試用
  // await new Promise((resolve) => setTimeout(resolve, 1000));
  // throw new Error("測試用錯誤：getBoards failed");

  const { data, error } = await supabase
    .from("boards")
    .select("*")
    .order("id", { ascending: true });

  if (error) throw error;
  return data;
};
