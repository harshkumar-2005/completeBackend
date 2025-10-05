const express = require('express');
const { Comment, Post } = require('../db');
const check = require('../middleware');

const commentRouter = express.Router();

commentRouter.use(check);
commentRouter.use(express.json());

commentRouter.post('/posts/:id/comments', async (req, res) => {
    try {
        const content = req.body.content;
        const userId = req.user.id;
        const postId = req.params.id;

        if (!content || content.trim === '') {
            res.status(400).send({ message: `Empty string is not allowed` });
        }

        // Verify the post exists?
        const post = await Post.findById(postId)
        if (!post) {
            res.status().send({ message: "The post not found" });
        }

        const comment = new Comment({
            content,
            userId,
            postId
        });

        await comment.save();

        post.comments.push(comment._id);
        await post.save();
    } catch (error) {
        res.status(500).send({ message: "Internal server error" });
    }
});

commentRouter.delete('/:id', async (req, res) => {
    try {
        const commentId = req.params.id;
        const userId = req.user.id;
        const comment = await Comment.findById(commentId);

        if (!comment) {
            res.status(404).send({ error: 'Comment not found' });
        }

        if (comment.userId.toString() !== userId) {
            return res.status(403).json({ error: 'Not authorized to delete this comment.' });
        }
        await Post.findByIdAndUpdate(comment.postId, { $pull: { comments: commentId } });

        await comment.deleteOne();

        res.status(200).json({ message: 'Comment deleted successfully.' });
    } catch (error) {
        console.error('Error deleting comment:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
    });

module.exports = ({ commentRouter });
