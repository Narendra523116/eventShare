const mongoose = require("mongoose")
const facultySchema = mongoose.Schema({
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
    mobileNumber:{
        type:String,
        requried:true
    },
    dept:{
        type:String,
        required:true
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

const Faculty = mongoose.model("faculty",  facultySchema)
module.exports = Faculty