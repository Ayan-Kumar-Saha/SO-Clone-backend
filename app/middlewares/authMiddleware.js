const { StatusCodes } = require("http-status-codes");
const UserModel = require("../models/userModel");
const { verifyAccessToken } = require("../services/jwtService");

const validateToken = (req, res, next) => {
	try {
		const authHeaders = req.headers["authorization"];
		const token = authHeaders && authHeaders.split(" ")[1];

		if (!token) {
			res.status(StatusCodes.UNAUTHORIZED).send({
				success: true,
				message: "authorization headers missing!",
			});
		}

		const decodedData = verifyAccessToken(token);

		const { email, username, _id } = decodedData;
		req["user"] = { _id, email, username };
		next();
	} catch (err) {
		res.status(StatusCodes.UNAUTHORIZED).send({
			success: true,
			message: "invalid/expired token",
		});
	}
};

const validateUser = async (req, res, next) => {
	try {
		const user = await UserModel.findOne({
			username: req.user.username,
			email: req.user.email,
			isActive: true,
		});

		if (!user || user._id != req.user._id) {
			res.status(StatusCodes.UNAUTHORIZED).send({
				success: true,
				message: "Invalid user!",
			});
		}

		next();
	} catch (err) {
		res.status(StatusCodes.UNAUTHORIZED).send({
			success: true,
			message: "Invalid user!",
		});
	}
};

module.exports = {
	validateToken,
	validateUser,
};
