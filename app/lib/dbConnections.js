"use strict";

require("dotenv").config();

const mongoose = require("mongoose");

const DB_URL = process.env.DB_URL;

mongoose.connect(DB_URL);

mongoose.connection.once("open", () => console.log("Connected to MongoDB successfully!"));
mongoose.connection.on("error", (err) => console.error(err));
