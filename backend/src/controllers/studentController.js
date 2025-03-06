const Student = require("../models/studentModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config()


const studentSignup = async (req, res) => {
    try {
        const { username, email, password, mobileNumber, dept, year } = req.body;
        console.log(req.body);
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const student = new Student({
            username,
            email,
            password: hashedPassword,
            mobileNumber,
            dept,
            year,
            role : "student"
        });

        await student.save();
        res.status(201).json({ message: "student registered successfully" });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Signup failed" });
    }
};

const studentLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const student = await Student.findOne({ email });
        if (!student) return res.status(404).json({ error: "User not found" });

        const isMatch = await bcrypt.compare(password, student.password);
        if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

        const token = jwt.sign({ id: student._id, role: "student" }, process.env.JWT_SECRET, { expiresIn: "1m" });

        res.json({ message: "Login successful", token });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Login failed" });
    }
};

module.exports = {studentSignup, studentLogin}
