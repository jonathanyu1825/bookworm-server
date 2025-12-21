import { bookService } from "../services/books.service.js";

export async function bookController(req, res) {
    const { id } = req.params;
    try {
        const bookResult = await bookService(id);
        console.log(bookResult);
        res.json(bookResult)
    } catch (err) {
        res.status(500).json({ error: err.message });
    }

}
