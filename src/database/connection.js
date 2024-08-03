const mongoose = require("mongoose");
require('dotenv').config();
const url = process.env.ATLASDB


const connect = async()=> {
        try {
            await mongoose.connect(url);
            console.log("connected to mongoDB Successully");
        } catch (error) {
            console.log("MongoDb connection error");
        }
}

//function call
connect();