const jwt = require("jsonwebtoken");
const User = require("../models/user");
require('dotenv').config();

const auth = async (req, res, next) => {
    console.log("auth")
  try {
    const token = req.header("authorization").replace("Bearer ", "");
    const data = jwt.verify(token,process.env.JWT_KEY);
    const user = await User.findOne({ _id: data._id , 'tokens.token': token });
    if (!user) {
      throw new Error("not authenticate");
    }
    req.token = token
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ error: "Please Authenticate." });
  }
};

module.exports = auth;
