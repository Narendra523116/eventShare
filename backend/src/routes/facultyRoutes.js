const express = require("express");
const { facultySignup, facultyLogin } = require("../controllers/facultyController");
const router = express.Router();

router.post("/signup", facultySignup);
router.post("/login", facultyLogin);

module.exports = router;
