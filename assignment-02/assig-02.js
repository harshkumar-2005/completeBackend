const dotenv = require('dotenv');
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const { hashPassword, verifyPassword } = require('./hash')
const { user, todo } = require('./db');

dotenv.config(); // load .env variables

const port = process.env.PORT

const jwt_secert = process.env.JWT_SECERT;

const app = express();

app.use(express.json());

async function connect() {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log({ message: "Connected sucessful" });
    } catch (e) {
        console.log({ message: "Invalid credentials" });
    }
}
connect();

app.get('/', (req, res) => {
    res.send("Welcome to the backend of the todo.");
});

app.post('/signup', async (req, res) => {
    try {
        const username = req.body.username;
        const hashedPassword = await hashPassword(req.body.password);

        const newUser = new user({
            username: username,
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).send({ message: "User has been added to the Database" });
    } catch (error) {
        console.error("The user was not able to get in DB", error);
        res.status(500).send({ message: "Error saving user to the database" });
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body; 

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    try {
        const existingUser = await user.findOne({ username });
        if (!existingUser) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        const isMatch = await verifyPassword(password, existingUser.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        const token = jwt.sign(
            { id: existingUser._id, username: existingUser.username },
            jwt_secert,
            { expiresIn: '1h' }
        );

        res.status(200).json({ 
            message: "Login successful",
            token
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});




app.listen(port, () => {
    console.log(`app is running at http://localhost:${port}`);
});
