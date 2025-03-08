const mongoose = require("mongoose");

const managementSchema = mongoose.Schema({
    _id: { 
        type: String, // Unique Management ID
        required: true 
    },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    role: { 
        type: String, 
        enum: ["management"], // Only "management" role allowed
        required: true 
    }
}, { timestamps: true });

const Management = mongoose.model("Management", managementSchema, "Management");
module.exports = Management;