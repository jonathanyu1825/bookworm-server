import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import bookRoutes from "./src/routes/books.routes.js";
import searchRoutes from "./src/routes/search.routes.js";
import trendingRoutes from "./src/routes/trending.routes.js";

import { connectRedis } from "./src/config/redis.js";

await connectRedis();

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// update to only allow frontend
app.use(cors());

app.use("/trending", trendingRoutes);
app.use("/search", searchRoutes);
app.use("/book", bookRoutes);

app.listen(PORT, () => {
    console.log("Server is running");
})