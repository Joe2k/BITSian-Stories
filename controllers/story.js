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
				console.log(error);
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

				return res.json(story.uniqueName);
			} catch (e) {
				fs.unlinkSync(req.file.path);
				console.log(e);
				return next(e);
			}
		});
	} catch (err) {
		console.log(err);
		return next(err);
	}
};

exports.updateStory = async (req, res, next) => {
	Story.findOneAndUpdate(
		{ uniqueName: req.params.uniqueName },
		{
			title: req.body.title,
			body: req.body.body,
			category: req.body.category,
			tags: req.body.tags,
			urls: req.body.urls,
		},
		(err, doc) => {
			if (err) {
				return next(err);
			}
			// console.log(doc);
			return res.json(doc.uniqueName);
		}
	);
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

		let recommendations = await Story.find({
			uniqueName: { $ne: story.uniqueName },
			category: story.category,
		});

		let newStories = [];

		recommendations.forEach((story) => {
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
				category: story.category,
			});
		});

		recommendations = getRandom(newStories, Math.min(3, newStories.length));
		//console.log({ ...story, recommendations });

		return res.json({ ...story._doc, recommendations });
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
				category: story.category,
			});
		});

		return res.json(newStories);
	} catch (e) {
		return next(e);
	}
};

exports.getStroiesByCategory = async (req, res, next) => {
	try {
		const stories = await Story.find({ category: req.params.category });
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

function getRandom(arr, n) {
	var result = new Array(n),
		len = arr.length,
		taken = new Array(len);
	if (n > len)
		throw new RangeError('getRandom: more elements taken than available');
	while (n--) {
		var x = Math.floor(Math.random() * len);
		result[n] = arr[x in taken ? taken[x] : x];
		taken[x] = --len in taken ? taken[len] : len;
	}
	return result;
}
