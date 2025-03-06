const Faculty = require("../models/facultyModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config()


const facultySignup = async (req, res) => {
    try {
        const { username, email, password, mobileNumber, dept } = req.body;

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const faculty = new Faculty({
            username,
            email,
            password: hashedPassword,
            mobileNumber,
            dept,
            role : "faculty"
        });

        await faculty.save();
        res.status(201).json({ message: "faculty registered successfully" });
    } catch (error) {
        res.status(500).json({ error: "Signup failed" });
    }
};

const facultyLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const faculty = await Faculty.findOne({ email });
        if (!faculty) return res.status(404).json({ error: "User not found" });

        const isMatch = await bcrypt.compare(password, faculty.password);
        if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

        const token = jwt.sign({ id: faculty._id, role: "faculty" }, process.env.JWT_SECRET, { expiresIn: "1m" });

        res.json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ error: "Login failed" });
    }
};

module.exports = {facultySignup, facultyLogin}
