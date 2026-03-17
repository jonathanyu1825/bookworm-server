import { loginUserService } from "../services/auth.service.js";

export async function loginUser(req, res) {
  try {
    const { username, password } = req.body;
    const user = await loginUserService(username, password);
    res.json(user);
  } catch (error) {
    return res.status(401).json({ message: "username not found" });
  }
}
