const mongoose = require('mongoose');
const config = require('./mongoose-config');

mongoose.connect(config.mongodb.url).then(()=>{
    console.log("connection successfully mongoose !!")
}).catch((err)=>{
    console.log("Connection Failed !!", err)
})