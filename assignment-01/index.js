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

// POST a new post
app.post('/posts', (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) {
        return res.status(400).send({ "message": "Post must include a title and content." });
    }

    const newPost = {
        id: nextId++,
        title,
        content
    };
    posts.push(newPost);
    res.status(201).send(newPost);
});

// PUT to update a post
app.put('/posts/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const post = posts.find(p => p.id === id);

    if (!post) {
        return res.status(404).send({ "message": "Post not found." });
    }

    const { title, content } = req.body;
    if (title) {
        post.title = title;
    }
    if (content) {
        post.content = content;
    }

    res.status(200).send({ "message": "Your post has been updated", "post": post });
});

// DELETE a post
app.delete('/posts/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const initialLength = posts.length;
    posts = posts.filter(post => post.id !== id);

    if (posts.length === initialLength) {
        return res.status(404).send({ "message": "Post not found." });
    }

    res.status(200).send({ "message": "Post deleted successfully." });
});

app.listen(port, () => {
    console.log(`App is running at http://localhost:${port}`);
});