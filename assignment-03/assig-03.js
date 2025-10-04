const dotenv = require('dotenv');
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const postRouter = require('./routes/posts');
const { User, Post, Comment } = require('./db');

dotenv.config();


async function connect() {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log({ message: "Connected sucessful" });
    } catch (e) {
        console.log({ message: "Invalid credentials" });
    }
}
connect();

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.use('/posts', postRouter);

app.get('/', (req, res) => {
    res.send("Welcome to the backend of the gramify.");
});


app.listen(port, ()=>{
    console.log(`App is running at http://localhost:${port}`);
})