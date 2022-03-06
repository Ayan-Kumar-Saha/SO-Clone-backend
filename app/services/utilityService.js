"use strict";

const { v4: uuidv4 } = require("uuid");

const generateUniqueId = (prefix = "") => {
	return prefix + uuidv4();
};

module.exports = {
	generateUniqueId,
};
