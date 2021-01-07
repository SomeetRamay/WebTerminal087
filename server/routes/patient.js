const { Patient, validate } = require("../models/patient");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

router.post("/login", async (req, res) => {
  await Patient.find({ username: req.body.username })
    .exec()
    .then((patient) => {
      if (patient.length < 1) {
        return res
          .status(401)
          .json({ message: "Auth failed // no user found" });
      }
      if (req.body.password === patient[0].password) {
        const token = jwt.sign(
          { username: patient[0].username, userId: patient[0]._id },
          "secret",
          { expiresIn: "1h" }
        );
        res.status(200).json({
          message: "Auth successful",
          token: token,
        });
      } else {
        res.status(401).json({
          message: "Auth failed // invalid pass",
        });
      }
    });
});

router.put("/:id", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const patient = await Patient.findByIdAndUpdate(
    req.params.id,
    {
      // username: req.body.username,
      // password: req.body.password,
      fName: req.body.fName,
      lName: req.body.lName,
      email: req.body.email,
    },
    { new: true }
  );

  if (!patient)
    return res.status(404).send("The patient with the given ID was not found.");

  res.send(patient);
});

router.put("/changePassword/:id", auth, async (req, res) => {
  const patient = await Patient.findByIdAndUpdate(
    req.params.id,
    { password: req.body.password },
    { new: true }
  );

  if (!patient)
    return res.status(404).send("The patient with the given ID was not found.");

  res.status(200).send(patient);
});

// router.delete("/:id", async (req, res) => {
//   const patient = await Patient.findByIdAndRemove(req.params.id);

//   if (!patient)
//     return res.status(404).send("The patient with the given ID was not found.");

//   res.send(patient);
// });

router.get("/:id", auth, async (req, res) => {
  const patient = await Patient.findById(req.params.id);

  if (!patient)
    return res.status(404).send("The patient with the given ID was not found.");

  res.send(patient);
});

// router.get("/", async (req, res) => {
//   const patients = await Patient.find().sort("username");
//   res.send(patients);
// });

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  var userCheck = false;
  await Patient.findOne({ username: req.body.username }, (error, patient) => {
    if (error) {
      console.log(error);
    } else if (patient) {
      userCheck = true;
    }
  });

  if (userCheck) {
    return res.status(400).send({ message: "Username already exist" });
  } else {
    let patient = new Patient({
      username: req.body.username,
      password: req.body.password,
      fName: req.body.fName,
      lName: req.body.lName,
      email: req.body.email,
    });
    patient = await patient.save();

    res.send(patient);
  }
});

module.exports = router;
