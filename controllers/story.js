const Story = require('../models/Story');

exports.createStory = (req, res, next) => {
	const story = await Story.create({
		title: req.body.title,
		body: req.body.body,
	});

	console.log(story);
};
