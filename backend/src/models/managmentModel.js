const mongoose = require("mongoose")
const managmentSchema = mongoose.Schema({
    email :{
        type:String,
        requried:true,
        unique:true
    },
    mobileNumber:{
        type:String,
        requried:true
    },
    password:{
        type:String,
        required:true
    },
    role: {
        type:String,
        requried:true
    }
},
{
    timestamps: true
})

const Managment = mongoose.model("managment", managmentSchema)
module.exports = Managment