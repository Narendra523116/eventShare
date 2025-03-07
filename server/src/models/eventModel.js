const mongoose = require("mongoose");

const eventSchema = mongoose.Schema(
    {
        _id: { type: String, required: true, unique: true },
        name: { type: String, required: true },
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

eventSchema.pre("save", function (next) {
    if (!this._id) {
        this._id = this.name.toLowerCase().replace(/\s+/g, "-") + "-" + this.date.toISOString().split("T")[0];
    }
    this._id = this._id.toLowerCase();
    next();
});

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
