const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// A simple counter for new post IDs
let nextId = 1;

// The single source of truth for all posts
let posts = [
    { "id": nextId++, "title": "My experience.", "content": "bla bla bla ...." },
    { "id": nextId++, "title": "My second post", "content": "More content here..." }
];

// GET all posts
app.get('/posts', (req, res) => {
    res.status(200).send(posts);
});

// GET a single post by ID
app.get('/posts/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const post = posts.find(p => p.id === id);

    if (!post) {
        return res.status(404).send({ "message": "Post not found" });
    }
    res.status(200).send(post);
});

app.listen(port, () => {
    console.log(`App is running at http://localhost:${port}`);
});