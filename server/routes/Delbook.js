const express = require("express");
const router = express.Router();
const { Books } = require("../models"); // Assuming you're using the Books model for your books

router.delete('/:id', async (req, res) => {
    const id = req.params.id; // Get the book id from the URL parameters
    try {
        const result = await Books.destroy({ where: { id: id } }); // Delete the book from the database
        res.json({ message: "Book deleted successfully" });
    } catch (error) {
        console.error('Error deleting book:', error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
