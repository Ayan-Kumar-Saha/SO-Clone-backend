"use strict";

const { generateHashedPassword } = require("../services/cryptoService");
const { generateAccessToken, generateApiToken } = require("../services/jwtService");
const { StatusCodes } = require("http-status-codes");
const UserModel = require("../models/userModel");
const { isPasswordValid } = require("../services/authService");

const signUp = async (req, res) => {
	try {
		if (!req.body.username || !req.body.password || !req.body.email) {
			res.status(StatusCodes.BAD_REQUEST).send({
				success: false,
				message: "email/username/password not found in request body!",
			});
		}

		const existingUser = await UserModel.findOne({
			$or: [{ email: req.body.email }, { username: req.body.username }],
		});

		if (existingUser) {
			res.status(StatusCodes.CONFLICT).send({
				success: true,
				message: "email/username already is use!",
			});
		}

		const hashedPassword = generateHashedPassword(req.body.password);

		const user = new UserModel({
			email: req.body.email,
			username: req.body.username,
			password: hashedPassword,
		});
		await user.save();

		res.status(StatusCodes.CREATED).send({
			success: true,
			message: "User registered successfull!",
			data: {
				userCreated: 1,
				userId: user._id,
			},
		});
	} catch (err) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).status({
			success: false,
			message: err.toString(),
		});
	}
};

const signIn = async (req, res) => {
	try {
		if (!req.body.username || !req.body.password) {
			res.status(StatusCodes.BAD_REQUEST).send({
				success: false,
				message: "username/password not found in request body!",
			});
		}

		const user = await UserModel.findOne({ username: req.body.username });
		if (!user) {
			res.status(StatusCodes.NOT_FOUND).send({
				success: true,
				message: "username not found!",
			});
		}

		if (!isPasswordValid(req.body.password, user.password)) {
			res.status(StatusCodes.UNAUTHORIZED).send({
				success: true,
				message: "incorrect password!",
			});
		}

		let userData = { _id: user._id, email: user.email, username: user.username };

		let accessToken = null;
		let apiToken = null;

		accessToken = generateAccessToken(userData);
		if (!req.body.skipApiToken) {
			apiToken = generateApiToken(userData);
		}

		res.status(StatusCodes.OK).send({
			success: true,
			message: "logged in successfully!",
			data: {
				accessToken,
				apiToken,
			},
		});
	} catch (err) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).status({
			success: false,
			message: err.toString(),
		});
	}
};

module.exports = { signUp, signIn };
