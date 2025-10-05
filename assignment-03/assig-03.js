const dotenv = require('dotenv');
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const { User, Post, Comment } = require('./db');
const postRouter = require('./routers/posts');
const commentRouter = require('./routers/comments')

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

// posts routes goes here.
app.use('/posts', postRouter);

// comment routes goes here.
app.use('/comments', commentRouter);

// Like endpoints goes here.

app.get('/', (req, res) => {
    res.send("Welcome to the backend of the gramify.");
});


app.listen(port, ()=>{
    console.log(`App is running at http://localhost:${port}`);
})