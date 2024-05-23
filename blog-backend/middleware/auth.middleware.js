const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    const decoded = jwt.verify(token, "secret");
    if (decoded) {
      req.body.user = decoded.userID;
      // req.user = decoded;
      next();
    } else {
      res.send({ message: "Please login" });
    }
  } else {
    res.send({ message: "Please login" });
  }
};

module.exports = { auth };
