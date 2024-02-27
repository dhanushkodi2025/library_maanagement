const express = require("express");
const router = express.Router();
const { reviews } = require("../models");

router.get('/:bookId', async (req, res) => { // Changed BookId to bookId
    const bookId = req.params.bookId; // Changed BookId to bookId
    try {
        const bookReviews = await reviews.findAll({ where: { BookId: bookId } });
        res.json(bookReviews);
    } catch (error) {
        console.error("Error fetching reviews:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.post("/", async (req, res) => {
    try {
        const review = req.body;
        // Log the review object to ensure it contains the expected data
        console.log("Received review:", review);
        
        // Create a new review in the database
        const createdReview = await reviews.create(review);
        
        // Log the created review object
        console.log("Created review:", createdReview);
        
        // Send the created review as a response
        res.json(createdReview);
    } catch (error) {
        console.error("Error creating review:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
