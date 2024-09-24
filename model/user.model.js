const mongoose = require("mongoose")

const User = new mongoose.Schema({
    first_name: String,
    last_name: String,
    username: String,
    chatId: Number,
    phone: String,
    admin: { type: Boolean, default: false},
    language: String,
    createdAt: Date,
})

module.exports = mongoose.model("User", User)