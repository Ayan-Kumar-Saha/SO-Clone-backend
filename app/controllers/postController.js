"use strict";

const { StatusCodes } = require("http-status-codes");
const PostModel = require("../models/postModel");

const getPostsByAllUsers = async (req, res) => {
	try {
		const filteredData = await PostModel.find({}, null, { sort: { createdOn: -1 } });

		res.status(StatusCodes.OK).send({
			success: true,
			message: "Posts fetched successfully!",
			data: filteredData,
		});
	} catch (err) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
			success: false,
			message: "Something went wrong! Please try again later",
		});
	}
};

const getPostByPostId = async (req, res) => {
	try {
		if (!req.params.postId) {
			res.status(StatusCodes.BAD_REQUEST).send({
				success: true,
				message: "postId not present is route params!",
			});
		}

		const filteredData = await PostModel.findOne({ postId: parseInt(req.params.postId) });

		if (!filteredData) {
			res.status(StatusCodes.NOT_FOUND).send({
				success: true,
				message: "postId not found!",
			});
		}

		res.status(StatusCodes.OK).send({
			success: true,
			message: "Post fetched successfully!",
			data: filteredData,
		});
	} catch (err) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
			success: false,
			message: "Something went wrong! Please try again later",
		});
	}
};

const savePost = async (req, res) => {
	try {
		const post = new PostModel({
			author: req.user,
			title: req.body.title,
			description: req.body.description,
		});

		await post.save();

		res.status(StatusCodes.CREATED).send({
			success: true,
			message: "Post saved successfully!",
			data: {
				postCreated: 1,
				postId: post.postId,
			},
		});
	} catch (err) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
			success: true,
			message: err.toString(),
		});
	}
};

module.exports = { getPostsByAllUsers, getPostByPostId, savePost };
