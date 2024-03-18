const mongoose = require("mongoose");
require('dotenv').config();

const database = "task_manager";
const URL = process.env.MONGO_URL+database;

mongoose
  .connect(URL, {})
  .then(() => {
    console.log("connection successfull");
  })
  .catch((error) => {
    console.log(error);
  });
