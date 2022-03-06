"use strict";

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
	email: { type: String, unique: true },
	username: {
		type: String,
		unique: true,
	},
	password: String,
	isActive: {
		type: Boolean,
		default: true,
	},
	createdOn: {
		type: Date,
		default: Date.now(),
	},
});

const UserModel = new mongoose.model("User", UserSchema);

module.exports = UserModel;
