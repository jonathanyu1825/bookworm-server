import { searchService } from "../services/search.service.js";

export async function searchController(req, res) {
    const { query } = req.params;
    try {
        const searchResults = await searchService(query);
        res.json(searchResults);
    } catch(err) {
        res.status(500).json({ error: err.message});
    }
}