Assignment 2: User Authentication & To-Do List API

Database: MongoDB with mongoose

User Authentication:

✅ Registration A user can sign up with a unique username and a password.Use bcrypt to hash and salt the user's password before saving it to the database

✅ Login 
A user can log in with their username and password.JWT Generation: If the credentials are correct, generate a JSON Web Token (JWT).Send the JWT back in the response.

Protected Routes:(middleware)
All to-do list operations must be protected. A user can only access these routes if they provide a valid JWT. send a 401 Unauthorized response.

GET /todos: Retrieve all to-do items for the authenticated user.

POST /todos: Create a new to-do item for the authenticated user. The request body should include the to-do item's content.

PUT /todos/:id: Update a specific to-do item for the authenticated user. A user can only update their own items.

DELETE /todos/:id: Delete a specific to-do item for the authenticated user. A user can only delete their own items.
