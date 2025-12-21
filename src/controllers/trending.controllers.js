import { fetchTrendingBooks } from "../services/trending.service.js";

export async function getTrendingBooks(req, res) {
    try {
        const trendingBooks = await fetchTrendingBooks();
        res.json(trendingBooks);
    } catch (error) {
        console.error("Error fetching trending books:", error);
    }
}