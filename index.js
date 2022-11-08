const express = require("express");
const { connectDB } = require("./config/db");
const { JobRouter } = require("./route/jobPost.route");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/jobPosts", JobRouter);
app.listen(PORT, async (req, res) => {
  try {
    await connectDB;
    console.log("connected at port : ", PORT);
  } catch (error) {
    console.log("connection failded", error);
  }
});
