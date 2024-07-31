const mongoose = require('mongoose');

const mongoUri = 'mongodb://localhost:27017/BookManagementSystem';

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = {
  async up() {
    // Code to create the "Books" collection
    const BookSchema = new mongoose.Schema({
      title: {
        type: String,
        required: true,
      },
      author: {
        type: String,
        required: true,
      },
      genre: {
        type: String,
        required: true,
      },
      summary: {
        type: String,
        required: false,
      },
      publishedDate: {
        type: Date,
        default: new Date(),
      },
    });

    const Books = mongoose.model("Books", BookSchema);
    await Books.createCollection();
    console.log('Migration applied: created "Books" collection');
  },

  async down() {
    // Code to drop the "Books" collection
    const Books = mongoose.model("Books");
    await Books.collection.drop();

    console.log('Migration reverted: dropped "Books" collection');
  },
};
