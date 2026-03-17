import { supabase } from "../utils/supabaseClient.js";

export async function loginUserService(username, password) {

  // https://supabase.com/docs/reference/javascript/admin-api
  const { data, error } = await supabase
    .from("users")
    .select("username, auth.users(email)")
    .eq("username", username);
  console.log(data);
  return { hi: "hi" };
}
