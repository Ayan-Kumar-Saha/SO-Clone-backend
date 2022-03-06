"use strict";

const jwt = require("jsonwebtoken");

const accessTokenSecret = process.env.ACC_TOKEN_SECRET || "f*0gdjf@/rtckj";
const apiTokenSecret = process.env.API_TOKEN_SECRET || "ywodn#h12DR%!~";
const accessTokenExpiry = process.env.ACC_TOKEN_EXPIRY || "1d";
const apiTokenExpiry = process.env.API_TOKEN_EXPIRY || "1h";

const _generateToken = (payload, secrectKey, options) => {
	return jwt.sign(payload, secrectKey, options);
};

const generateAccessToken = (payload) => {
	return _generateToken(payload, accessTokenSecret, { expiresIn: accessTokenExpiry });
};

const generateApiToken = (payload) => {
	return _generateToken(payload, accessTokenSecret, { expiresIn: apiTokenExpiry });
};

const verifyAccessToken = (token) => {
	return jwt.verify(token, accessTokenSecret);
};

const verifyApiToken = (token) => {
	return jwt.verify(token, apiTokenSecret);
};

module.exports = {
	generateAccessToken,
	generateApiToken,
	verifyAccessToken,
	verifyApiToken,
};
