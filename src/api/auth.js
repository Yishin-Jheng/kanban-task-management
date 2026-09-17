import supabase from "@/api/supabase";

export const GUEST_EMAIL = "guest@kanban.com";
export const GUEST_PASSWORD = "kanban_guest";

export const retrieveSession = async () => {
  const { data, error } = await supabase.auth.getSession();

  if (error) throw error;
  return data.session?.user ?? null;
};

export const login = async (arg) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: arg.email,
    password: arg.password,
  });

  if (error) throw error;

  // 重置訪客帳號中的DEMO資料
  if (data?.user?.email === GUEST_EMAIL) {
    const { error: resetError } = await supabase.rpc("reset_guest_demo_data");
    if (resetError) throw resetError;
  }

  return data?.user ?? null;
};

export const logout = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) throw error;
};
