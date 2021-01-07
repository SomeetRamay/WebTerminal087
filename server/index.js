const mongoose = require("mongoose");
const log = require("./routes/log");
const patient = require("./routes/patient");
const contactUs = require("./routes/contact-us");
const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config();

mongoose
  .connect(
    "mongodb+srv://bilal123:bilal123@vueexpress-djjvt.mongodb.net/test?retryWrites=true&w=majority",
    { useUnifiedTopology: true, useNewUrlParser: true }
  )
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error("Could not connect to MongoDB..."));

app.use(cors());
app.use(express.json());
app.use("/api/log", log);
app.use("/api/patient", patient);
app.use("/api/contact", contactUs);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
