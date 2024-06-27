const express = require("express");
const app = express();
const cors = require("cors");
const _port = 3000;
// Define CORS options
const corsOptions = {
  origin: "*", // Allow requests from this origin
  credentials: true, // Allow sending cookies from the client
};

// Use CORS middleware with options
app.use(cors(corsOptions));
app.use(express.json());

const username = process.env.USERNAME;
const password = process.env.PASSWORD;
const db = process.env.DB;
const mongoose = require("mongoose");
mongoose.connect(
  `mongodb+srv://${username}:${password}@cluster0.hn6rbqq.mongodb.net/${db}?retryWrites=true&w=majority&appName=Cluster0`
);

//Models
const UserModel = require("./models/Users");

//Get all users
app.get("/users", async (req, res) => {
  const users = await UserModel.find();
  res.send(users);
});

// Create a new user
app.post("/add-user", async (req, res) => {
  try {
    const { name, age, email } = req.body;
    console.log(name, age, email);
    const newUser = new UserModel({ name, age, email });
    await newUser.save();

    res.status(201).send(newUser); // Respond with the created user
  } catch (error) {
    res.status(400).send(error);
  }
});

// Update an existing user
app.put("/update-user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, age, email } = req.body;
    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      { name, age, email },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).send({ message: "User not found" });
    }
    res.status(200).send(updatedUser);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a user
app.delete("/delete-user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await UserModel.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).send({ message: "User not found" });
    }
    res.status(200).send({ message: "User deleted successfully" });
  } catch (error) {
    res.status(400).send(error);
  }
});

app.listen(_port, () => {
  console.log("App is working on port : " + _port);
});
