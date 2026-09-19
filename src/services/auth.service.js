import { supabase } from "../utils/supabaseClient.js";
import createError from "http-errors";

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

export async function signupUserService({ username, email, password }) {
  const { data: usernameExists, error: usernameExistsError } = await supabase
    .from("users")
    .select("id")
    .eq("username", username)
    .maybeSingle();

  if (usernameExists) {
    const error = new createError.Conflict("Username already exists.");
    error.field = "username";
    throw error;
  }
  const { data: emailExists, error: availableEmailError } = await supabase
    .from("emails")
    .select("user_id")
    .eq("email", email)
    .maybeSingle();

  if (emailExists) {
    // need to check if email is verified or unverified
    // verified:
    const { data, error } = await supabase.auth.admin.getUserById(
      emailExists.user_id,
    );

    if (data.user.user_metadata.email_verified) {
      const error = new createError.Conflict("This email exists.");
      error.field = "email";
      throw error;
    } else {
      const error = new createError.Conflict(
        "Your account is awaiting confirmation!",
      );
      error.field = "verification";
      throw error;
    }
  }

  const defaultProfileImage =
    "https://piehvbdsttqyyfswhtjk.supabase.co/storage/v1/object/public/user_avatars/default_profile.png";

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        avatar_url: defaultProfileImage,
        username,
      },
    },
  });

  // create email lookup table

  if (error) {
    throw error;
  }
  return data;
}

export async function deleteUserService(userId) {
  const { data: deleteUsernameData, error: deleteUsernameError } =
    await supabase.from("users").delete().eq("id", userId);
  const { data, error } = await supabase.auth.admin.deleteUser(userId);

  if (error) {
    throw error;
  }

  return data;
}
