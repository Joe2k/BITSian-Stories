const Story = require('../models/Story');
const Metric = require('../models/Metric');
const { convert } = require('html-to-text');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const newrelic = require('newrelic');
const readingTime = require('reading-time');

exports.createStory = async (req, res, next) => {
	try {
		// Test Stuff
		// console.log(JSON.parse(req.body.tags));
		// fs.unlinkSync(req.file.path);
		// return res.status(500);
		if (req.body.password !== process.env.ADMIN_PASS) {
			fs.unlinkSync(req.file.path);
			return next('Not authorized! Stop messing with me -.-!');
		}

		cloudinary.uploader.upload(req.file.path, async (error, result) => {
			if (error) {
				console.log(error);
				return next(error);
			}
			try {
				let body = {
					title: req.body.title,
					body: req.body.body,
					profilePic: result.url,
					category: req.body.category,
					tags: JSON.parse(req.body.tags),
					urls: JSON.parse(req.body.urls),
					uniqueName: req.body.uniqueName,
					branch: req.body.branch,
				};
				if (req.body.cgpa) {
					body = { ...body, cgpa: req.body.cgpa };
				}
				const story = await Story.create(body);

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
	if (req.body.password !== process.env.ADMIN_PASS) {
		return next('Not authorized! Stop messing with me -.-!');
	}
	let body = {
		title: req.body.title,
		body: req.body.body,
		category: req.body.category,
		tags: req.body.tags,
		urls: req.body.urls,
		branch: req.body.branch,
	};
	if (req.body.cgpa) {
		body = { ...body, cgpa: req.body.cgpa };
	}

	Story.findOneAndUpdate(
		{ uniqueName: req.params.uniqueName },
		body,
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
	newrelic.setTransactionName('/story/' + req.params.uniqueName);
	newrelic.addCustomAttribute('uniqueName', req.params.uniqueName);
	try {
		Metric.findOneAndUpdate(
			{ name: '/story/' + req.params.uniqueName },
			{ $inc: { count: 1 } },
			{ upsert: true },
			(err, doc) => {
				console.log(err);
				console.log(doc);
			}
		);
		const story = await Story.findOne({
			uniqueName: req.params.uniqueName,
		});
		if (!story) {
			return next('Story Not Found');
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
				stats: readingTime(story.body.replace(/<[^>]+>/g, '')),
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
		const stories = await Story.find({}).sort({ date: -1 }).exec();
		let newStories = [];

		stories.forEach((story) => {
			let bodyText = convert(story.body);
			bodyText = bodyText.split(' ');
			bodyText = bodyText.slice(0, Math.min(20, bodyText.length));
			bodyText = bodyText.join(' ');
			bodyText += '...';
			newStories.push({
				id: story._id,
				title: convert(story.title),
				body: bodyText,
				profilePic: story.profilePic,
				tags: story.tags,
				uniqueName: story.uniqueName,
				category: story.category,
				stats: readingTime(story.body.replace(/<[^>]+>/g, '')),
			});
		});

		return res.json(newStories.reverse());
	} catch (e) {
		return next(e);
	}
};

exports.getStroiesByCategory = async (req, res, next) => {
	newrelic.setTransactionName('/category/' + req.params.category);
	newrelic.addCustomAttribute('category', req.params.category);
	try {
		Metric.findOneAndUpdate(
			{ name: '/category/' + req.params.category },
			{ $inc: { count: 1 } },
			{ upsert: true },
			(err, doc) => {
				console.log(err);
				console.log(doc);
			}
		);
		const stories = await Story.find({ category: req.params.category });
		let newStories = [];

		stories.forEach((story) => {
			let bodyText = convert(story.body);
			bodyText = bodyText.split(' ');
			bodyText = bodyText.slice(0, Math.min(20, bodyText.length));
			bodyText = bodyText.join(' ');
			bodyText += '...';
			newStories.push({
				id: story._id,
				title: convert(story.title),
				body: bodyText,
				profilePic: story.profilePic,
				tags: story.tags,
				uniqueName: story.uniqueName,
				stats: readingTime(story.body.replace(/<[^>]+>/g, '')),
			});
		});

		return res.json(newStories);
	} catch (e) {
		return next(e);
	}
};

exports.updateSearchMetrics = async (req, res, next) => {
	newrelic.setTransactionName('/search/' + req.params.search);
	newrelic.addCustomAttribute('search', req.params.search);
	Metric.findOneAndUpdate(
		{ name: '/search/' + req.params.search },
		{ $inc: { count: 1 } },
		{ upsert: true },
		(err, doc) => {
			console.log(err);
			console.log(doc);
		}
	);
	return res.status(200);
};

exports.updateUserMetrics = async (req, res, next) => {
	newrelic.incrementMetric('users');
	newrelic.setTransactionName('/newUser');
	newrelic.addCustomAttribute('newUser', 'yes');
	Metric.findOneAndUpdate(
		{ name: '/newUser' },
		{ $inc: { count: 1 } },
		{ upsert: true },
		(err, doc) => {
			console.log(err);
			console.log(doc);
		}
	);
	return res.status(200);
};

exports.getAllMetrics = async (req, res, next) => {
	const metrics = await Metric.find({});
	return res.json(metrics);
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
