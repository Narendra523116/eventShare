const Faculty = require("../models/facultyModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config()


const facultySignup = async (req, res) => {
    try {
        const { id, username, email, password, mobileNumber, dept } = req.body;


        const user = await Faculty.findOne({ 
                $or: [{ email: email }, {_id : id}]
        });

        // Hash the password
        if(user){
            return res.status(409).json({message : "user already exists"})
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);

        const faculty = new Faculty({
            _id:id,
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
        console.log(error)
        res.status(500).json({ error: "Signup failed" });
    }
};

const facultyLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const faculty = await Faculty.findOne({ 
            $or: [{ email: email }]
        });
        if (!faculty) return res.status(404).json({ error: "User not found" });

        const isMatch = await bcrypt.compare(password, faculty.password);
        if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

        const token = jwt.sign({ id: faculty._id, role: "faculty" }, process.env.JWT_SECRET, { expiresIn: "10d" });

        res.json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ error: "Login failed" });
    }
};

module.exports = {facultySignup, facultyLogin}
