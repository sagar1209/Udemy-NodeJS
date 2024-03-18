const nodemailer = require("nodemailer");
require('dotenv').config();

// Create a transporter using SMTP transport
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sagarsenjaliya423@gmail.com",
    pass: process.env.EMAIL_KEY
  },
});

const welcomEmail = (email, name) => {
  const mailOptions = {
    from: "sagarsenjaliya423@gmail.com",
    to: email,
    subject: "welcome to user",
    text: `hello ${name} , you have successfully created account on owr website`,
  };

  // Send the email
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.error("Error occurred:", error);
    } else {
      console.log("Email sent successfully:", info.response);
    }
  });
};

const canclationEmail = (email, name) => {
  const mailOptions = {
    from: "sagarsenjaliya423@gmail.com",
    to: email,
    subject: "deleted account",
    text: `hello ${name} , you have successfully deleted account on owr website`,
  };

  // Send the email
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.error("Error occurred:", error);
    } else {
      console.log("Email sent successfully:", info.response);
    }
  });
};

module.exports = {
  welcomEmail,
  canclationEmail,
};
