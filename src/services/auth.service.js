import { supabase } from "../utils/supabaseClient.js";

export async function loginUserService(username) {
  // https://supabase.com/docs/reference/javascript/admin-api

  // need to include error handling for miscellaneous non business logic related errors (if those will even happen)
  const { data: userId, error: userIdError } = await supabase
    .from("users")
    .select("id")
    .eq("username", username)
    .single();
  if (!userId) {
    return { error: "user not found" };
  }
  const { data, error } = await supabase.auth.admin.getUserById(userId.id);
  return { email: data.user.email };
}
