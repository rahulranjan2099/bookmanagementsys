const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    genre: String,
    summary: String,
    publishedDate: Date,
});

const Books = mongoose.model("Books", bookSchema);

module.exports = Books;