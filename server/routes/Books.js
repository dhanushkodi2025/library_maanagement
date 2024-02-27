const express = require("express");
const router = express.Router();
const { Books} = require("../models");

router.get('/', async(req, res) => {
    const listofbooks = await Books.findAll();
    res.json(listofbooks);
});

router.get('/byId/:id', async (req, res) => {
    const id = req.params.id;
    const book = await Books.findByPk(id);
    res.json(book);
})

router.post('/', async (req, res) => {
    const book = req.body;
    await Books.create(book);
    res.json(book);
});

module.exports = router;