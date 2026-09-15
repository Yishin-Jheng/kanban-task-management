import supabase from "@/api/supabase";

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
  return data?.user ?? null;
};

export const logout = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) throw error;
};
