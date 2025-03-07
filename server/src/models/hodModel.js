const mongoose = require("mongoose");
const hodSchema = mongoose.Schema({
    _id: { 
        type: String, // HOD ID as the unique identifier
        required: true 
    },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    dept: { type: String, required: true },
    role: { type: String, enum: ["faculty", "hod"], required: true }
}, { timestamps: true });

const Hod = mongoose.model("Hod", hodSchema, "HODs");
module.exports = Hod;