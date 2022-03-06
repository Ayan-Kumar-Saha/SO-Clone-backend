"use strict";

const { comparePassword } = require("./cryptoService");

const isPasswordValid = (plainTextPassword, hashedPassword) => {
	return comparePassword(plainTextPassword, hashedPassword);
};

module.exports = {
	isPasswordValid
}