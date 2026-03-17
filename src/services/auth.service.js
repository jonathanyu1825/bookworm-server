import { supabase } from "../utils/supabaseClient.js";

export async function loginUserService(username, password) {
  // https://supabase.com/docs/reference/javascript/admin-api
  const { data: userId, error: userIdError } = await supabase
    .from("users")
    .select("id")
    .eq("username", username)
    .single();
  if (!userId) {
    throw new Error("username doesn't exist");
  }
  const { data, error } = await supabase.auth.admin.getUserById(userId.id);
  return { email: data.user.email };
}
