const dotenv = require('dotenv');
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const { hashPassword, verifyPassword } = require('./hash')
const { user, todo } = require('./db');

dotenv.config(); // load .env variables

const port = process.env.PORT

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



app.listen(port, () => {
    console.log(`app is running at http://localhost:${port}`);
});
