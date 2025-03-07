const Hod = require("../models/hodModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config()

const hodSignup = async (req, res) => {
    try {
        const { username, email, password, mobileNumber, dept } = req.body;

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const hod = new Hod({
            username,
            email,
            password: hashedPassword,
            mobileNumber,
            dept,
            role : "hod"
        });

        await hod.save();
        res.status(201).json({ message: "hod registered successfully" });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Signup failed" });
    }
};

const hodLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const hod = await Hod.findOne({ email });
        if (!hod) return res.status(404).json({ error: "User not found" });

        const isMatch = await bcrypt.compare(password, hod.password);
        if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

        const token = jwt.sign({ id: hod._id, role: "hod" }, process.env.JWT_SECRET, { expiresIn: "1m" });

        res.json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ error: "Login failed" });
    }
};

module.exports = {hodSignup, hodLogin}
