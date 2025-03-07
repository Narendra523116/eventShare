const express = require("express");
const { addEvent, updateEvent, deleteEvent, getEventById, getAllEvents, registerParticipant, updateWinners } = require("../controllers/eventController");
const { authenticate, authorize } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/add", authenticate, authorize(["faculty", "hod", "management"]), addEvent); // Only faculty, hod, management can add
router.put("/update/:id", authenticate, authorize(["faculty", "hod", "management"]), updateEvent); // Update event details
router.delete("/delete/:id", authenticate, authorize(["faculty", "hod", "management"]), deleteEvent); // Cancel event
router.get("/:id", getEventById); // Get event by ID
router.get("/", getAllEvents); // Get all events
router.post("/register/:id", authenticate, (req, res, next) => {
    req.params.id = req.params.id.toLowerCase();
    next();
}, registerParticipant);  // Students register for an event
router.put("/update-winners/:id", authenticate, authorize(["faculty", "hod", "management"]), updateWinners); // Organizers update winners & images

module.exports = router;
