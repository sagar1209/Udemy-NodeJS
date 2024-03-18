const express = require("express");
require("./db/mongoose");
const app = express();
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");
require('dotenv').config();

const PORT = process.env.PORT || 3000;

// // this is also not work
// app.use((req, res, next) => {
//   if (req.method == "GET") {
//     next();
//   }
//   res.send("this will give me error")// this is not work
// });

// app.use((req, res, next) => {
//   if (req.method == "GET") {
//     next();
//   }
//   else res.send("helloo")
// });

// app.use((req, res, next) => {
//   if (req.method == "GET") {
//     next();
//   }
//    console.log("next pass ")

// });

app.use(express.json());

app.use(userRouter);
app.use(taskRouter);

// const jwt = require("jsonwebtoken");

// const myfunction = () => {
//   const token = jwt.sign(
//     { _id: "sagar", username: "sagar1209" },
//     "thisismynewtoken",
//     { expiresIn: "7 days" }
//   );
//   console.log(token);

//   setTimeout(() => {
//     const data = jwt.verify(token, "thisismynewtoken");
//     console.log(data);
//   }, 2000);
// };

// myfunction();

app.listen(PORT, () => {
  console.log("server is running on " + PORT);
});
