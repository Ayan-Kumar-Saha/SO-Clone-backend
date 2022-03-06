"use strict";

const bcrypt = require("bcrypt");

const generateHashedPassword = (password, saltRounds = 10) => {
	return bcrypt.hashSync(password, saltRounds);
};

const comparePassword = (plainTextPassword, hashedPassword) => {
	return bcrypt.compareSync(plainTextPassword, hashedPassword);
};

module.exports = { generateHashedPassword, comparePassword };
