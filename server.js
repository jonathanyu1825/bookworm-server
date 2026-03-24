import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import rateLimit from "express-rate-limit";

import bookRoutes from "./src/routes/books.routes.js";
import searchRoutes from "./src/routes/search.routes.js";
import trendingRoutes from "./src/routes/trending.routes.js";
import authRoutes from "./src/routes/auth.routes.js";


import { connectRedis } from "./src/config/redis.js";

await connectRedis();

dotenv.config();

const app = express();
const PORT = 3000;

// const limiter = rateLimit({
//     windowMs: 15 * 60 * 1000,
//     max: 10,
//     message: "too many requests"
// })

app.use(express.json());

// app.use(limiter);

// update to only allow frontend
app.use(cors());

app.use("/trending", trendingRoutes);
app.use("/search", searchRoutes);
app.use("/book", bookRoutes);
app.use("/auth", authRoutes);

app.listen(PORT, () => {
    console.log("Server is running");
})
// app.listen(PORT, '0.0.0.0', () => {
//     console.log("Server is running");
// })