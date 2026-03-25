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

export async function signupUserService(username, email, password) {
  // todo: check if username exists

  const { error: usernameExistsError } = await supabase
    .from("users")
    .select("id")
    .eq("username", username)
    .maybeSingle();

  if (!data) {
    const defaultProfileImage =
      "https://piehvbdsttqyyfswhtjk.supabase.co/storage/v1/object/public/user_avatars/default_profile.png";

    const { data, error } = await supabase.auth.admin.createUser({
      email: email,
      password: password,
      user_metadata: {
        avatar_url: defaultProfileImage,
        username: username,
      },
    });
  } else {
    
  }
}
