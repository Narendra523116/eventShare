const mongoose = require("mongoose")
require("dotenv").config()

const MONGO_URI = process.env.MONGO_URI

const dbConnect = async()=>{
    try{
        const connect = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Database Connected : ${connect.connection.host}, ${connect.connection.user}`)
    }catch(error){
        console.log(error);
        process.exit(1);
    }
};

module.exports = dbConnect;