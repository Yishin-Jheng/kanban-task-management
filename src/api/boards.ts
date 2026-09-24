import supabase from "@/api/supabase";
import { Tables } from "@/types/supabase";

type Board = Tables<"boards">;

interface ColumnForm {
  id?: number;
  statusName?: string;
}

interface BoardForm {
  id?: number;
  boardName: string;
  columns?: ColumnForm[];
}

export const getBoards = async (): Promise<Board[]> => {
  const { data, error } = await supabase
    .from("boards")
    .select("*")
    .order("id", { ascending: true });

  if (error) throw error;
  return data;
};

export const upsertBoard = async (arg: BoardForm): Promise<Board["id"]> => {
  const { id, boardName, columns = [] } = arg;
  const validColumns = columns.flatMap((col) => {
    if (!col.statusName) return [];
    return [{ ...col, statusName: col.statusName }];
  });
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

export const deleteBoard = async (arg: { boardId: number }): Promise<void> => {
  const { boardId } = arg;
  const { error } = await supabase
    .from("boards")
    .delete()
    .eq("id", boardId)
    .single();

  if (error) throw error;
};
