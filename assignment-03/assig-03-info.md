Assignment 3: Social Media Post API
Your task is to build a backend API for a simple social media platform. You will implement features for user-generated content, including posts, likes, and comments.

Requirements:

Database: Continue to use MongoDB with Mongoose. You'll need to create three models: User, Post, and Comment.

Models:

User: (You already have this) - username, password.

Post: Should include a reference to the User who created it. It should have a title, content, an array of likes (referencing User IDs), and an array of comments (referencing Comment IDs).

Comment: Should have content and a reference to the User who created it.

Protected Routes: All routes for creating, updating, and deleting posts and comments must be protected by your JWT authentication middleware.

Endpoints:

Post Endpoints:

POST /posts: Create a new post.

GET /posts: Retrieve all posts. Posts should be sorted by creation date (newest first).

GET /posts/:id: Retrieve a single post by its ID. It should also include its associated comments.

PUT /posts/:id: Update a post. Only the post's creator can update it.

DELETE /posts/:id: Delete a post. Only the post's creator can delete it.

Comment Endpoints:

POST /posts/:id/comments: Add a comment to a specific post.

DELETE /comments/:id: Delete a comment. Only the comment's creator can delete it.

Like Endpoints:

POST /posts/:id/like: Add a like to a specific post. A user can only like a post once. If the user has already liked the post, this endpoint should remove the like.