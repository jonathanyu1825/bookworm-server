import { loginUserService } from "../services/auth.service.js";
import { signupUserService } from "../services/auth.service.js";

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

export async function deleteUser(req, res) {
  try {
    const { userId } = req.body;
    await deleteUserService({ userId });
    res.status(200).json({
      message: "Account deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to delete account",
    });
  }
}
