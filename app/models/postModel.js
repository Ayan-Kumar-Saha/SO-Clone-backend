"use strict";

const mongoose = require("mongoose");
const CounterModel = require("./counterModel");

const PostSchema = new mongoose.Schema({
	postId: { type: Number },
	author: mongoose.Schema.Types.Mixed,
	title: String,
	description: String,
	createdOn: {
		type: Date,
		default: Date.now(),
	},
});

PostSchema.pre("save", function (next) {
	var doc = this;

	CounterModel.findOneAndUpdate(
		{ sequenceId: "post" },
		{ $inc: { value: 1 } },
		{ upsert: true, new: true },
		function (err, counter) {
			if (err) return next(err);
			doc.postId = counter.value;
			next();
		}
	);
});

const PostModel = new mongoose.model("Post", PostSchema);

module.exports = PostModel;
