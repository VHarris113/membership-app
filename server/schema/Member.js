const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    userName: String,
    email: String,
    phone: Number,
    age: Number,
    memberDate: Date
});

module.exports = mongoose.model("User", userSchema);