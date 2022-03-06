"use strict";

const mongoose = require("mongoose");

const CounterSchema = new mongoose.Schema({
	sequenceId: String,
	value: { type: Number, default: 0 },
});

const CounterModel = new mongoose.model("Counter", CounterSchema);

module.exports = CounterModel;
