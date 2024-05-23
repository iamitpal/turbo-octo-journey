const express = require("express");
const { blogModel } = require("../models/blog.model");
const blogRouter = express.Router();

blogRouter.post("/add", async (req, res) => {
  try {
    const payload = req.body;
    const blog = new blogModel(payload);
    await blog.save();

    res.send({ Message: "Blog Added" });
    res.status(200).json(blog);
  } catch (err) {
    console.log({ err: err.message });
    res.send({ message: "Blog Added Failed", error: err.message });
    res.status(500).json({ err: err.message });
  }
});

blogRouter.get("/get", async (req, res) => {
  try {
    const data = await blogModel.find();
    res.send(data);
  } catch (error) {
    res.send({ "Blogs Fetch Failed": error.message });
    console.log(error);
  }
});

blogRouter.get("/get/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await blogModel.find({ _id: id });
    res.send(data);
  } catch (error) {
    res.send(`Blog  ${id} Fetch Failed`, { error: error.message });
    console.log(error);
  }
});

blogRouter.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await blogModel.findByIdAndDelete({ _id: id });
    res.send({ msg: `Blog ${id} Deleted` });
  } catch (error) {
    res.send(`Blog ${id} Delete Failed`, { error: error.message });
    console.log(error);
  }
});

module.exports = { blogRouter };
