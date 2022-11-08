const { Router } = require("express");
const { JobModel } = require("../model/jobPost.model");

const JobRouter = Router();

JobRouter.post("/upload", async (req, res) => {
  try {
    const newJob = new JobModel(req.body);
    await newJob.save();
    return res
      .status(201)
      .send({ type: "success", messsage: "job posted Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(501).send({
      type: "error",
      message: "Please try again",
    });
  }
});

JobRouter.get("/getAll", async (req, res) => {
  try {
    const { sortBy, role } = req.query;
    if (role && !sortBy) {
      const jobPosts = await JobModel.find({ role });
      return res.status(200).send({ type: "success", data: jobPosts });
    } else if (role && sortBy) {
      const jobPosts = await JobModel.find({ role }).sort({
        postedAt: sortBy == "asc" ? 1 : -1,
      });
      return res.status(200).send({ type: "success", data: jobPosts });
    } else if (!role && sortBy) {
      const jobPosts = await JobModel.find().sort({
        postedAt: sortBy == "asc" ? 1 : -1,
      });
      return res.status(200).send({ type: "success", data: jobPosts });
    } else if (!role && !sortBy) {
      const jobPosts = await JobModel.find();
      return res.status(200).send({ type: "success", data: jobPosts });
    }
  } catch (error) {
    return res.status(501).send({
      type: "error",
      message: "Something went wrong",
    });
  }
});

module.exports = { JobRouter };
