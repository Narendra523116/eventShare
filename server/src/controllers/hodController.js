const Hod = require("../models/hodModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config()

const hodSignup = async (req, res) => {
    try {
        const { id, username, email, password, mobileNumber, dept } = req.body;

        // Hash the password

        const user = await Student.findOne({ 
            $or: [{ email: email }, {_id : id}]
        });
        
        if(user){
            return res.status(409).json({message : "user already exists"})
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const hod = new Hod({
            _id:id,
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

        const hod = await Hod.findOne({ 
            $or: [{ email: email }, { _id: _id }]
        });
        if (!hod) return res.status(404).json({ error: "User not found" });

        const isMatch = await bcrypt.compare(password, hod.password);
        if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

        const token = jwt.sign({ id: hod._id, role: "hod" }, process.env.JWT_SECRET, { expiresIn: "10d" });

        res.json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ error: "Login failed" });
    }
};

module.exports = {hodSignup, hodLogin}
