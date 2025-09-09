require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const tasksRouter = require("./src/routes/taskRoutes.js");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Task Manager API is running" });
});

app.use("/api/tasks", tasksRouter);

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
  });
