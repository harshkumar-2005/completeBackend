const mongoose = require('mongoose');

const schema = mongoose.Schema;

const userSchema = new schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const todoSchema = new schema({
    todo: { type: String, required: true },
    userId: { type: schema.Types.ObjectId, ref: "Users" }, // renamed for clarity
});

const user = mongoose.model('Users', userSchema);
const todo = mongoose.model('Todos', todoSchema);

module.exports = { user, todo };
