const mongoose = require("mongoose");
const studentSchema = mongoose.Schema({
    _id: { 
        type: String, 
        required: true 
    },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    dept: { type: String, required: true },
    year: { type: Number, required: true },
    role: {type:String, enum: ["student"], default:"student", required:true}
}, { timestamps: true });

const Student = mongoose.model("Student", studentSchema, "Students");
module.exports = Student;