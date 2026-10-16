const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const Student = require("./models/student");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

mongoose.connect("mongodb://127.0.0.1:27017/studentDB")
    .then(function () {
        console.log("MongoDB connected");
        app.listen(3000, function () {
            console.log("Server running at http://localhost:3000");
        });
    })
    .catch(function (error) {
        console.log("MongoDB connection error:", error.message);
    });

app.post("/signup", async function (req, res) {
     console.log("1. Signup request received");
    try {
        const studentData = req.body;
          console.log("2. Received data:", studentData);

        const student = new Student({
            name: studentData.studentName,
            age: Number(studentData.age),
            rollNumber: studentData.rollNumber,
            className: studentData.className,
            dob: studentData.dob,
            email: studentData.email,
            password: studentData.password
        });
         console.log("3. Saving student...");

   const savedStudent = await student.save();

console.log("4. Saved student:", savedStudent);

res.status(201).json({ message: "Student registered successfully" });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({ message: "Email already registered" });
        }

        res.status(500).json({ message: "Unable to register student" });
    }
});