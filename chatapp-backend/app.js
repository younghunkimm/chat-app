const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const app = express();

app.use(cors());

mongoose.connect(process.env.DB, {
    // node.js DRIVER 6.0.0 이후 지원안함
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
}).then(() => console.log("connected to database"));

module.exports = app;