const Student = require("../models/studentModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config()


const studentSignup = async (req, res) => {
    try {
        const { id, username, email, password, mobileNumber, dept, year } = req.body;
        console.log(req.body);
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await Student.findOne({ 
            $or: [{ email: email }, {_id : id}]
        });

        if(user){
            return res.status(409).json({message : "user already exists"})
        }


        const student = new Student({
            _id: id,
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

        const student = await Student.findOne({ 
            $or: [{ email: email }]
        });
        if (!student) return res.status(404).json({ error: "User not found" });

        const isMatch = await bcrypt.compare(password, student.password);
        if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

        const token = jwt.sign({ id: student._id, role: "student" }, process.env.JWT_SECRET, { expiresIn: "10d" });

        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Login failed" });
    }
};

module.exports = {studentSignup, studentLogin}
