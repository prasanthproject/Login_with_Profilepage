const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const Student = require("./models/student");
const session = require("express-session");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "Public")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "Public", "signup.html"));

});
app.use(session({
    secret: "replace-this-with-a-long-random-secret",
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, secure: false, sameSite: "lax" }
}));

mongoose
  .connect("mongodb://127.0.0.1:27017/studentDB")
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
    const existingStudent = await Student.findOne({ email: studentData.email });

if (existingStudent) {
    return res.status(409).json({ message: "Email already registered" });
}
    console.log("2. Received data:", studentData);

    const student = new Student({
      name: studentData.studentName,
      age: Number(studentData.age),
      rollNumber: studentData.rollNumber,
      className: studentData.className,
      dob: studentData.dob,
      email: studentData.email,
      password: studentData.password,
    });
    console.log("3. Saving student...");

    const savedStudent = await student.save();

    console.log("4.Saved student:", savedStudent);

    res.status(201).json({ message: "Student registered successfully" });
  } catch (error) {
    console.error("Signup save failed:", error);

    if (error.code === 11000) {
      return res.status(409).json({ message: "Email already registered" });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }

    res.status(500).json({ message: "Unable to register student" });
  }
});

app.post("/login", async function (req, res) {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const student = await Student.findOne({ email: email.trim() });

        if (!student || student.password !== password) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        req.session.studentId = student._id;

        res.json({ message: "Login successful" });
    } catch (error) {
        console.log("Login error:", error);
        res.status(500).json({ message: "Unable to login" });
    }
});

app.get("/profile-data", async function (req, res) {
    try {
        if (!req.session.studentId) {
            return res.status(401).json({ message: "Please login first" });
        }

        const student = await Student.findById(req.session.studentId).select("-password");

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.json(student);
    } catch (error) {
        console.log("Profile error:", error);
        res.status(500).json({ message: "Unable to load profile" });
    }
});

app.post("/logout", function (req, res) {
    req.session.destroy(function (error) {
        if (error) {
            return res.status(500).json({ message: "Unable to logout" });
        }

        res.clearCookie("connect.sid");
        res.json({ message: "Logged out successfully" });
    });
});
