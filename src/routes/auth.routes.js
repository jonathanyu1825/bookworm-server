import express from "express";
import rateLimit from "express-rate-limit";

import { loginUser } from "../controllers/auth.controllers.js";
import { signupUser } from "../controllers/auth.controllers.js";

const router = express.Router();



router.post('/login', loginUser);

router.post('/signup', signupUser);

export default router;