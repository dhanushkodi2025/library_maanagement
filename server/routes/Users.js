const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");

router.post('/', async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user with the hashed password
        const newUser = await Users.create({
            username: username,
            password: hashedPassword,
        });

        // Send success response
        res.json({ message: "User created successfully", user: newUser });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Error creating user" });
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await Users.findOne({ where: { username: username } })
    if (!user) res.json({ error: "user not found" })
    bcrypt.compare(password, user.password).then((match)=> {
        if (!match) res.json({ error: "wrong Username and password" });

        res.json("YOU LOGGED IN");
    });
})

module.exports = router;
