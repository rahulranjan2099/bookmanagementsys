const Books = require("../models/books");
const Review = require("../models/review");
const mongoose = require("mongoose");

module.exports.getBooksList = async(req,res) =>{
        console.log("checkingreq...", req.body);
       const gotBooksList = await Books.find({
            //  author: "rahul"
        }, 'title author');
        console.log("checkinggotBooksList", gotBooksList);
        res.send(gotBooksList);
}

module.exports.getReviewById = async(req,res) =>{
        console.log("checkingreqparamss...", req.params);
        const { id } = req.params;
        const gotBookReview = await Review.find({
            bookId: id
        });
        console.log("checkinggotBookReview", gotBookReview);
        res.send(gotBookReview);
}
module.exports.getSingleBook = async(req,res) =>{
        console.log("checkingreq...", req.body);
        console.log("checkingreqparamss...", req.params);
        const {id} = req.params;
        const gotSingleBook = await Books.findById(id);
        console.log("checkinggotSingleBook", gotSingleBook);
        res.send(gotSingleBook);
}
module.exports.addBook = async(req,res) =>{
    const session = await mongoose.startSession();
    session.startTransaction();
    try{
        console.log("checkingreq", req.body);
        const creatingObj = req.body;
        const newBook = await Books.create(creatingObj);
        console.log("checkingnewBook", newBook)
        await session.commitTransaction();
        session.endSession();
        res.send("Book Added Successfully !!");
    }catch(err){
        console.log("checkinerrr...", err)
        await session.abortTransaction();
        session.endSession();
        throw new Error(err);
    }
}
module.exports.addReviewByBookId = async(req,res) =>{
    const session = await mongoose.startSession();
    session.startTransaction();
    try{
        console.log("checkingreqparams", req.params);
        console.log("checkingreqbody", req.body);
        const { id } = req.params;
        const { reviewerName, reviewRating, comment} = req.body;
        if(!reviewerName || !reviewRating || !comment){
            throw new Error("Necessary Field is Required !!");
        }
        const creatingReviewObj = {
            bookId: id,
            reviewer: reviewerName,
            rating: reviewRating,
            comment: comment,
        };
        const newReview = await Review.create(creatingReviewObj);
        console.log("checkingnewReview", newReview)
        await session.commitTransaction();
        session.endSession();
        res.send("Review Added Successfully !!");
    }catch(err){
        console.log("checkinerrr...", err)
        await session.abortTransaction();
        session.endSession();
        throw new Error(err);
    }
}
module.exports.updateBooks = async(req,res) =>{
    const session = await mongoose.startSession();
    session.startTransaction();
    try{
        console.log("checkingputparams..", req.params);
        console.log("checkingbody...", req.body);
        const { id } = req.params;
        const updateData = req.body;
        const updatedBook = await Books.updateOne({ _id: id }, updateData);
        console.log("checkingupdatedBook", updatedBook);
        await session.commitTransaction();
        session.endSession();
        res.send("Book Updated Successfully !!")
    }catch(err){
        console.log("checkingerrr...", err);
        await session.abortTransaction();
        session.endSession();
        throw new Error(err);
    }
}
module.exports.deleteBook = async(req,res) =>{
    const session = await mongoose.startSession();
    session.startTransaction();
    try{
        console.log("checkingdeleteparams", req.params);
        const { id } = req.params;
        const deleteRes = await Books.deleteOne({ _id: id });
        console.log("checkingdeleteres", deleteRes)
        await session.commitTransaction();
        session.endSession();
        res.send("Book Deleted Successfully !!")
    }catch(err){
        console.log("checkingerr...", err);
        await session.abortTransaction();
        session.endSession();
        throw new Error(err);
    }
}