const Story = require('../models/Story');
const { convert } = require('html-to-text');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

exports.createStory = async (req, res, next) => {
	try {
		// Test Stuff
		// console.log(JSON.parse(req.body.tags));
		// fs.unlinkSync(req.file.path);
		// return res.status(500);

		cloudinary.uploader.upload(req.file.path, async (error, result) => {
			if (error) {
				return next(error);
			}
			try {
				const story = await Story.create({
					title: req.body.title,
					body: req.body.body,
					profilePic: result.url,
					category: req.body.category,
					tags: JSON.parse(req.body.tags),
					urls: JSON.parse(req.body.urls),
					uniqueName: req.body.uniqueName,
				});

				fs.unlinkSync(req.file.path);

				return res.json(story._id);
			} catch (e) {
				fs.unlinkSync(req.file.path);
				return next(e);
			}
		});
	} catch (err) {
		return next(err);
	}
};

exports.getStoryById = async (req, res, next) => {
	try {
		const story = await Story.findById(req.params.id);
		return res.json(story);
	} catch (e) {
		return next(e);
	}
};

exports.getStoryByUniqueName = async (req, res, next) => {
	try {
		const story = await Story.findOne({
			uniqueName: req.params.uniqueName,
		});
		if (!story) {
			return next(e);
		}
		return res.json(story);
	} catch (e) {
		return next(e);
	}
};

exports.getAllStories = async (req, res, next) => {
	try {
		const stories = await Story.find({});
		let newStories = [];

		stories.forEach((story) => {
			let bodyText = convert(story.body);
			bodyText = bodyText.split(' ');
			bodyText = bodyText.slice(0, Math.min(20, bodyText.length));
			bodyText = bodyText.join(' ');
			newStories.push({
				id: story._id,
				title: convert(story.title),
				body: bodyText,
				profilePic: story.profilePic,
				tags: story.tags,
				uniqueName: story.uniqueName,
			});
		});

		return res.json(newStories);
	} catch (e) {
		return next(e);
	}
};
