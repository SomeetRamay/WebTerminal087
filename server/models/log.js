const Joi = require("joi");
const mongoose = require("mongoose");

const Log = mongoose.model(
  "Log",
  new mongoose.Schema({
    date: {
      type: Date,
      default: Date.now
    },
    selectedTime: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 25
    },
    bloodGlucose: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 10
    },
    insulinCoverage: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 25
    },
    meal: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 50
    },
    carbs: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 25
    },
    calories: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 25
    },
    patientId: {
      type: String,
      required: true
    }
  })
);

function validateLog(log) {
  const schema = {
    selectedTime: Joi.string()
      .min(5)
      .max(25)
      .required(),
    bloodGlucose: Joi.number()
      .min(1)
      .max(200)
      .required(),
    insulinCoverage: Joi.number()
      .min(0)
      .max(200)
      .required(),
    meal: Joi.string()
      .min(1)
      .max(50)
      .required(),
    carbs: Joi.number()
      .min(0)
      .required(),
    calories: Joi.number()
      .min(0)
      .required(),
    patientId: Joi.string().required()
  };

  return Joi.validate(log, schema);
}

exports.Log = Log;
exports.validate = validateLog;
