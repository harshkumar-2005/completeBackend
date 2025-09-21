Basic: Simple Blog API
This first assignment focuses on CRUD (Create, Read, Update, Delete) operations, which are fundamental to most web applications. You'll build the backend for a simple blog without a frontend, focusing on handling HTTP requests and managing data.

Requirements:

Routes: Create routes for GET, POST, PUT, and DELETE requests for blog posts.

Data Storage: Store the blog posts in a simple JSON file or an in-memory array for now. No database is required for this assignment.

Endpoints:

✅ GET /posts: Retrieve all blog posts.

✅ GET /posts/:id: Retrieve a single blog post by its ID.

✅ POST /posts: Create a new blog post. The request body should include a title and content.

✅ PUT /posts/:id: Update an existing blog post. The request body can contain a new title or new content.

✅ DELETE /posts/:id: Delete a specific blog post.

Validation: Handle cases where a post ID doesn't exist, and return an appropriate status code (e.g., 404 Not Found) with a clear message.
