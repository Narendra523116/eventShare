const Managment = require("../models/managementModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config()


const managementSignup = async (req, res) => {
    try {
        const { id, username, email, password, mobileNumber} = req.body;

        // Hash the password
        const user = await Student.findOne({ 
            $or: [{ email: email }, {_id : id}]
        });

        if(user){
            return res.status(409).json({message : "user already exists"})
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const managment = new Managment({
            _id:id,
            username, 
            email,
            password: hashedPassword,
            mobileNumber,
            role : "management"
        });

        await managment.save();
        res.status(201).json({ message: "management registered successfully" });
    } catch (error) {
        res.status(500).json({ error: "Signup failed" });
    }
};

const managementLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const managment = await Managment.findOne({ 
            $or: [{ email: email }, { _id: _id }]
        });
        if (!managment) return res.status(404).json({ error: "User not found" });

        const isMatch = await bcrypt.compare(password, managment.password);
        if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

        const token = jwt.sign({ id: managment._id, role: "management" }, process.env.JWT_SECRET, { expiresIn: "10d" });

        res.json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ error: "Login failed" });
    }
};

module.exports = {managementSignup, managementLogin}
