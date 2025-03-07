const mongoose = require("mongoose");
const eventSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    venue: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    organizers: [
        {
            _id: {
                type: String, // Student roll number (custom ID)
                required: true
            },
            name: {
                type: String,
                required: true
            }
        }
    ],
    approvedBy: [
        {
            _id: {
                type: String, // Faculty/HOD/Management ID (custom)
                required: true
            },
            role: {
                type: String,
                enum: ["faculty", "hod", "management"], // Restrict roles
                required: true
            },
            name: {
                type: String,
                required: true
            },
            approvedAt: {
                type: Date,
                default: Date.now
            }
        }
    ]
}, {
    timestamps: true
});

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
