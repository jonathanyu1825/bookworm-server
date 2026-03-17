import { loginUserService } from "../services/auth.service.js";

export async function loginUser(req, res) {
  try {
    const { username } = req.body;
    const user = await loginUserService(username);

    if (user.error) {
      console.log("hi");
      return res.status(401).json({
        message: user.error,
      });
    }
    res.json(user);
  } catch (error) {
    return res.status(500).json({ message: "internal server errror" });
  }
}
