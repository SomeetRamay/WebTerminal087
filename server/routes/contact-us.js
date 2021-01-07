const Joi = require("joi");
const express = require("express");
const router = express.Router();

const schema = {
  name: Joi.string().required(),
  email: Joi.string().required(),
  subject: Joi.string().required(),
  message: Joi.string().required()
};

const myEmail = "dibateslog@gmail.com";
const myPass = "onE2thrEE";

router.post("/", async (req, res) => {
  console.log("sending mail");

  const { error } = Joi.validate(req.body, schema);
  if (error) return res.status(400).send(error.details[0].message);

  var nodemailer = require("nodemailer");

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: myEmail,
      pass: myPass
    }
  });

  var mailOptions = {
    from: myEmail,
    to: myEmail,
    subject: "Diabets Log CONTACT-US",
    text:
      "Name: " +
      req.body.name +
      "\nEmail: " +
      req.body.email +
      "\nSubject: " +
      req.body.subject +
      "\nMessage: " +
      req.body.message
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(400).send(error);
    } else {
      console.log("Email sent: " + info.response);
      res.send({ message: "message submitted" });
    }
  });
});

module.exports = router;
