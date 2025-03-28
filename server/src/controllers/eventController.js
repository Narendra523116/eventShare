const Event = require("../models/eventModel");
const Student = require("../models/studentModel");
const student = require("../models/studentModel")

// adding the event
const addEvent = async (req, res) => {
    try {
        const { name, eventType, description, venue, date, organizers, approvedBy } = req.body;
        const id = name.toLowerCase().replace(/\s+/g, "-") + "-" + new Date(date).toISOString().split("T")[0]; // ensuring that id's dont differ just by case

        //checking whether an event existed before with that id 
        const existingEvent = await Event.findById({ _id : id});
        if (existingEvent) {
            return res.status(400).json({ message: "Event ID already exists. Please use a unique ID." });
        }

        //if no id existed prior then that event can be created
        const newEvent = new Event({ _id:id, name, eventType, description, venue, date, organizers, approvedBy });
        await newEvent.save();
        res.status(201).json({ message: "Event added successfully", event: newEvent });
    } catch (error) {
        res.status(500).json({ message: "Error adding event", error });
    }
};

// retriving the event
const getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        //event not found
        if (!event) return res.status(404).json({ message: "Event not found" });
        res.status(201).json(event);
    } catch (error) {
        res.status(500).json({ message: "Error fetching event", error });
    }
};

//retriving all the events
const getAllEvents = async (req, res) => {
    try {
        const { types } = req.query; // fetching events based on the user preference

        let filter = {};
        if (types) {
            const eventTypesArray = types.split(",");
            if (eventTypesArray.length > 0) {
                filter.eventType = { $in: eventTypesArray };
            }
        }

        const events = await Event.find(filter);
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// updating the event
const updateEvent = async (req, res) => {
    try {

        // checking whether that event is there or not, if not there is no point of updating it
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: "Event not found!" });
        }

        await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
        const updatedEvent = await Event.findById(req.params.id)
        res.status(201).json({ message: "Event updated successfully",  updatedEvent});
    } catch (error) {
        res.status(500).json({ message: "Error updating event", error });
    }
};

// deleting the event
const deleteEvent = async (req, res) => {
    try {

        // checking whether that event is there or not, if not there is no point of deleting it
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: "Event not found!" });
        }

        // if event there then delete that
        await Event.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Event deleted successfully!" });

    } catch (error) {
        res.status(500).json({ message: "Error deleting event", error: error.message });
    }
}

const registerParticipant = async (req, res) => {
    try {
        console.log(req.params)
        console.log(req.user)
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ message: "Event not found" });
        const student = await Student.findById(req.user.id)
        console.log(student)
        if(!student) return res.status(404).json( {message : "Invalid roll no"} )

        // Checking if the user is already registered or not
        const isAlreadyRegistered = event.participants.some(
            (participant) => participant._id.toString().toLowerCase() === req.user.id.toString().toLowerCase()
        );

        if (isAlreadyRegistered) {
            return res.status(400).json({ message: "You are already registered for this event" });
        }

        // if the user is not there then we can add him / her
        event.participants.push({_id: req.user.id, name: student.username});
        await event.save();

        res.status(201).json({ message: "Successfully registered for event" });
    } catch (error) {
        res.status(500).json({ message: "Error registering for event", error: error.message });
    }
};



// Revoke participant registration
const revokeParticipant = async (req, res) => {
    try {
        const eventId = req.params.id;
        const userId = req.user.id;

        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        // Check if the user is registered
        const participantIndex = event.participants.findIndex(participant => participant._id === userId);
        if (participantIndex === -1) {
            return res.status(400).json({ message: "You are not registered for this event" });
        }

        // Remove participant
        event.participants.splice(participantIndex, 1);
        await event.save();

        res.status(200).json({ message: "Unregistered successfully", event });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


// updating the winners in the event space after the event is completed by the organizers
const updateWinners = async (req, res) => {
    try {
        const { winners, images } = req.body;
        const event = await Event.findById(req.params.id);

        if (!event) return res.status(404).json({ message: "Event not found" });

        event.winners = winners;
        event.images = images;
        
        await event.save();

        res.status(201).json({ message: "Event updated with winners and images" });
    } catch (error) {
        res.status(500).json({ message: "Error updating winners", error });
    }
};

module.exports = { addEvent, getEventById, getAllEvents, updateEvent, deleteEvent, registerParticipant, revokeParticipant, updateWinners };
