require("./config/mongoose/mongoose");
const express = require("express");
const app = express();
const cors = require('cors');

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const bookRoute = require("./routes/books");
// const reviewRoute = require("./routes/bookActions"); 

app.use("/books", bookRoute);
// app.use("/review", reviewRoute);

app.listen(5000, ()=>{
    console.log("app is running in port 5000 !!")
});