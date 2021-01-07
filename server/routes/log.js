const { Log, validate } = require("../models/log");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

router.get("/:id", auth, async (req, res) => {
  const logs = await Log.find({ patientId: req.params.id }).sort("date");
  res.send(logs);
});

router.get("/", auth, async (req, res) => {
  const logs = await Log.find();
  res.send(logs);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  let log = new Log({
    selectedTime: req.body.selectedTime,
    bloodGlucose: req.body.bloodGlucose,
    insulinCoverage: req.body.insulinCoverage,
    meal: req.body.meal,
    carbs: req.body.carbs,
    calories: req.body.calories,
    patientId: req.body.patientId
  });
  log = await log.save();

  res.send(log);
});

router.put("/:id", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  const log = await Log.findByIdAndUpdate(
    req.params.id,
    {
      selectedTime: req.body.selectedTime,
      bloodGlucose: req.body.bloodGlucose,
      insulinCoverage: req.body.insulinCoverage,
      meal: req.body.meal,
      carbs: req.body.carbs,
      calories: req.body.calories,
      patientId: req.body.patientId
    },
    { new: true }
  );

  if (!log)
    return res
      .status(404)
      .send({ message: "The log with the given ID was not found." });

  res.send(log);
});

router.delete("/:id", async (req, res) => {
  const log = await Log.findByIdAndRemove(req.params.id);

  if (!log)
    return res
      .status(404)
      .send({ message: "The log with the given ID was not found." });

  res.send(log);
});

// router.get("/:id", async (req, res) => {
//   const log = await Log.findById(req.params.id);

//   if (!log)
//     return res.status(404).send("The log with the given ID was not found.");

//   res.send(log);
// });

module.exports = router;
