import { loginUserService } from "../services/auth.service.js";
import { signupUserService } from "../services/auth.service.js";
import { deleteUserService } from "../services/auth.service.js";
import { supabase } from "../utils/supabaseClient.js";

export async function loginUser(req, res) {
  try {
    const { username } = req.body;
    const user = await loginUserService(username);

    if (user.error) {
      return res.status(401).json({
        message: user.error,
      });
    }
    res.json(user);
  } catch (error) {
    return res.status(500).json({ message: "internal server errror" });
  }
}

export async function signupUser(req, res, next) {
  try {
    const { email, username, password } = req.body;

    const user = await signupUserService({ email, username, password });
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
}

export async function deleteUser(req, res, next) {
  try {

    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      console.log("hi");
      return res.status(401).json({
        error: "Unauthorized",
      });
    }
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token);

    if (error) {
      console.log(error);
    }

    await deleteUserService(user.id );
    res.status(200).json({
      message: "Account deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to delete account",
    });
  }
}
