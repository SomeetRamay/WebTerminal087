const Joi = require("joi");
const mongoose = require("mongoose");

const Patient = mongoose.model(
  "Patient",
  new mongoose.Schema({
    username: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 20
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 16
    },
    fName: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 50
    },
    lName: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 50
    },
    email: {
      type: String,
      required: true,
      minlength: 7
    }
  })
);

function validatePatient(patient) {
  const schema = {
    username: Joi.string()
      .required()
      .min(3)
      .max(20),
    password: Joi.string()
      .required()
      .min(8)
      .max(16),
    fName: Joi.string()
      .required()
      .min(1)
      .max(50),
    lName: Joi.string()
      .required()
      .min(1)
      .max(50),
    email: Joi.string()
      .required()
      .min(7)
  };

  return Joi.validate(patient, schema);
}

exports.Patient = Patient;
exports.validate = validatePatient;
