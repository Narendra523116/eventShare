const mongoose = require("mongoose");
const facultySchema = mongoose.Schema({
    _id: { 
        type: String, // Faculty ID as the unique identifier
        required: true 
    },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    dept: { type: String, required: true },
    role: { type: String, enum: ["faculty", "hod"], required: true }
}, { timestamps: true });

const Faculty = mongoose.model("Faculty", facultySchema, "FacultyMembers");
module.exports = Faculty;