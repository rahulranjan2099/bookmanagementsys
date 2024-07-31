const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Books",
    required: true,
  },
  reviewer: String,
  rating: Number,
  comment: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
