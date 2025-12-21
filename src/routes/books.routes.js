import express from "express";
import { bookController } from "../controllers/books.controllers.js";

const router = express.Router();

router.get("/:id", bookController);

export default router;