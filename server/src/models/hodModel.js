const mongoose = require("mongoose")
const hodSchema = mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    dept:{
        type:String,
        required:true
    },
    mobileNumber:{
        type:String,
        requried:true
    },
    role:{
        type:String,
        required:true,
        enum:["faculty", "hod"]
    }
},
{
    timestamps: true
});

const Hod = mongoose.model("hod",  hodSchema)
module.exports = Hod