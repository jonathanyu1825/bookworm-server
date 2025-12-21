import express from "express";
import { searchController } from "../controllers/search.controllers.js";

const router = express.Router();

router.get("/:query", searchController);

export default router;