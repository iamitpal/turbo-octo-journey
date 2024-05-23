const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { connection } = require("./config/db");
const { userRouter } = require("./routes/user.routes");
const { blogRouter } = require("./routes/blog.routes");
const { auth } = require("./middleware/auth.middleware");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/user", userRouter);
app.use(auth);
app.use("/blog", blogRouter);

app.listen(process.env.PORT || 3001, async () => {
  try {
    await connection;
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(`Error in connection w/ server: ${error}`);
  }
  console.log("Server is running on port 8080");
});
