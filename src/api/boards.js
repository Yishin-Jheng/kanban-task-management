import supabase from "@/store/supabase";

export const getBoards = async () => {
  const { data, error } = await supabase
    .from("boards")
    .select("*")
    .order("id", { ascending: true });

  if (error) throw error;
  return data;
};

export const upsertBoard = async (arg) => {
  const { id, boardName, columns = [] } = arg;
  const validColumns = columns.filter((col) => col.statusName);
  const { data, error } = await supabase.rpc("upsert_board_with_columns", {
    pBoardId: id ?? null,
    pBoardName: boardName,
    pColumns: validColumns.map((col) => ({
      id: col.id ?? null,
      statusName: col.statusName,
    })),
  });

  if (error) throw error;
  return data;
};

export const deleteBoard = async (arg) => {
  const { boardId } = arg;
  const { error } = await supabase
    .from("boards")
    .delete()
    .eq("id", boardId)
    .single();

  if (error) throw error;
};
