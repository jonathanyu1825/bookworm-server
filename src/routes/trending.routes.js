import { Router } from "express";
import { getTrendingBooks } from "../controllers/trending.controllers.js";

const router = Router();

router.get("/books", getTrendingBooks);

export default router;