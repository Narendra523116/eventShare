const mongoose = require("mongoose")
const studentSchema = mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    dept:{
        type:String,
        required:true
    },
    year:{
        type:String,
        required:true
    },
    mobileNumber:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
},
{
    timestamps: true
});

const Student = mongoose.model("student",  studentSchema)
module.exports = Student