const express = require("express");
const router = express.Router();
const {
    getBooksList,
    getSingleBook,
    getReviewById,
    addBook,
    addReviewByBookId,
    updateBooks,
    deleteBook,
} = require("../controllers/books");
const asyncHandler = require("../middleware/tryCatchHandler");
const errorHandler = require("../middleware/errorHandler");

router.get("/list", asyncHandler(getBooksList));

router.get("/list/:id", asyncHandler(getSingleBook));

router.get("/:id/reviews", asyncHandler(getReviewById));

router.post("/add", addBook);

router.post("/:id/reviews", addReviewByBookId);

router.put("/:id", updateBooks);

router.delete("/:id", deleteBook);

router.use(errorHandler);

module.exports = router;

