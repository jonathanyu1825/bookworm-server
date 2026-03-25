import { loginUserService } from "../services/auth.service.js";

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

export async function signupUser(req, res) {
  try {
    const { email, username, password } = req.body;
    // check for existing users
    
  } catch (error) {
    return ("sup");
  }
} 
