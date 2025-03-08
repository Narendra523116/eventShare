const mongoose = require("mongoose");


const eventTypes = [
    "Technical",
    "Cultutral",
    "Sports",
    "Literary",
    "Entrepreneurship",
    "Social",
    "Workshop",
    "Fun"
]

const eventSchema = mongoose.Schema(
    {
        _id: { type: String, required: true },
        name: { type: String, required: true },
        eventType: {type: String, required: true, enum: eventTypes},
        description: { type: String, required: true },
        venue: { type: String, required: true },
        date: { type: Date, required: true },
        organizers: [
            {
                id: { type: String, required: true },
                name: { type: String, required: true },
                role: { type: String, enum: ["student", "faculty", "hod", "management"] }
            }
        ],
        approvedBy: [
            {
                id: { type: String, required: true },
                name: { type: String, required: true },
                role: { type: String, enum: ["faculty", "hod", "management"] }
            }
        ],
        participants: [
            {
                id: { type: String, required: true },
                name: { type: String, required: true }
            }
        ],
        isCompleted: { type: Boolean, default: false },
        winners: [
            {
                id: { type: String, required: true },
                name: { type: String, required: true },
                position: { type: Number, required: true }
            }
        ],
        images: [{ type: String }]
    },
    { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
