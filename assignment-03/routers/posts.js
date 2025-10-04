const express = require('express');
const postRouter = express.Router();
const jwt = require('jsonwebtoken');
const { check } = require('../middleware');
const { Post } = require('../db');

postRouter.use(check);

postRouter.post('/create', async (req, res) => {
    try {
        const userId = req.user.userId; // set by middleware
        const { title, content } = req.body;

        const post = new Post({ userId, title, content });
        await post.save();

        res.status(201).json(post);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create post' });
    }
});

postRouter.get('/', async (req, res) => {
    try {
        const posts = await Post.find()
            .sort({ createdAt: -1 }) // newest first
            .populate('userId', 'username') // optional: populate author info
            .populate('comments'); // optional: if you want full comments

        res.json(posts);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch posts' });
    }
});

postRouter.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
            .populate('userId', 'username')
            .populate({
                path: 'comments',
                populate: { path: 'userId', select: 'username' }
            });

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        res.json(post);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch post' });
    }
});

postRouter.put('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ error: 'Post not found' });

        if (post.userId.toString() !== req.user.userId) {
            return res.status(403).json({ error: 'Not authorized to update this post' });
        }

        post.title = req.body.title || post.title;
        post.content = req.body.content || post.content;
        await post.save();

        res.json(post);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update post' });
    }
});

postRouter.delete('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ error: 'Post not found' });

        if (post.userId.toString() !== req.user.userId) {
            return res.status(403).json({ error: 'Not authorized to delete this post' });
        }

        await post.deleteOne();
        res.json({ message: 'Post deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete post' });
    }
});

module.exports = postRouter;