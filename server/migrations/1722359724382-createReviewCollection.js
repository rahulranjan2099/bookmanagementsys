const mongoose = require('mongoose');
const config = require('../config/mongoose/mongoose-config');
mongoose.connect(config.mongodb.url, config.mongodb.options);

module.exports = {
  async up() {
    const ReviewSchema = new mongoose.Schema({
      bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Books',
        required: true,
      },
      reviewer: {
        type: String,
        required: true,
      },
      rating: {
        type: String,
        required: true,
      },
      comment: {
        type: String,
        required: false,
      },
      createdAt: {
        type: Date,
        default: new Date(),
      },
    });

    const Review = mongoose.model("Review", ReviewSchema);
    await Review.createCollection();
    console.log('Migration applied: created "Review" collection');
  },

  async down() {
    // Code to drop the "Review" collection
    const Review = mongoose.model("Review");
    await Review.collection.drop();

    console.log('Migration reverted: dropped "Review" collection');
  },
};
