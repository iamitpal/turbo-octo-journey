const express = require("express");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { userModel } = require("../models/user.model");

const userRouter = express.Router();

userRouter.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) {
        console.log(`error in bcrypt ${err}`);
      } else {
        const user = new userModel({ name, email, password: hash });
        await user.save();
        res.send("Registered Successfully");
      }
    });
  } catch (error) {
    res.send("User Signup Failed");
    console.log(error);
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.find({ email });
    if (user) {
      bcrypt.compare(password, user[0].password, async (err, result) => {
        if (result) {
          var token = jwt.sign({ userID: user._id }, "secret");
          res.send({ msg: "Login Successful", token: token });
        } else {
          res.send("Login Failed");
        }
      });
    } else {
      res.send("No User Found");
    }
  } catch (error) {
    res.send("Login Failed");
    console.log(error);
  }
});

module.exports = { userRouter };
