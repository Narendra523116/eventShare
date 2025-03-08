const express = require("express")
const cors = require("cors")
const studentRoutes = require("./src/routes/studentRoutes");
const facultyRoutes = require("./src/routes/facultyRoutes");
const hodRoutes = require("./src/routes/hodRoutes");
const managementRoutes = require("./src/routes/managementRoutes");
const eventRoutes = require("./src/routes/eventRoutes");

const dbConnect = require("./src/config/dbconnect")
require("dotenv").config()

const app = express()


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({
    extended:true
}))


const PORT = process.env.PORT || 7001
dbConnect();

app.get("/", (req, res)=>{
    res.status(200).json({
        message : "server is running succesfully"
    })
})

app.get("/api/", (req, res)=>{
    res.status(200).json({message : "API route is listening properly"})
})

app.use("/api/student", studentRoutes);
app.use("/api/faculty", facultyRoutes);
app.use("/api/hod", hodRoutes);
app.use("/api/management", managementRoutes);
app.use("/api/events", eventRoutes);

app.listen(PORT, ()=>{
    console.log(`server is running in the port ${PORT} succesfully`)
})