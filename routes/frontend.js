const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const Story = require('../models/Story');
const { convert } = require('html-to-text');

router.get('/story/:uniqueName', async (req, res) => {
	const story = await Story.findOne({ uniqueName: req.params.uniqueName });

	const pathToIndex = path.join(
		__dirname,
		'..',
		'client',
		'build',
		'index.html'
	);
	const raw = fs.readFileSync(pathToIndex);
	if (!story) {
		let updated = raw.toString().replace(/\$OG_TITLE/g, 'BITSian Stories');
		updated = updated.replace(
			/\$OG_DESCRIPTION/g,
			'Bringing to you the experiences and anecdotes of some incredible BITSians who have done fantastic in the area of their interests!'
		);
		updated = updated.replace(
			/\$OG_IMAGE/g,
			'https://res.cloudinary.com/bitsianstories/image/upload/v1626503413/banner_gsd0fx.png'
		);
		res.send(updated);
	} else {
		let bodyText = convert(story.body);
		bodyText = bodyText.split(' ');
		bodyText = bodyText.slice(0, Math.min(20, bodyText.length));
		bodyText = bodyText.join(' ');
		bodyText = bodyText + '... \n';
		story.tags.forEach((tag) => {
			bodyText += tag.text + ' | ';
		});

		let name = convert(story.title);
		name = name
			.toLowerCase()
			.split(' ')
			.map((s) => s.charAt(0).toUpperCase() + s.substring(1))
			.join(' ');
		// console.log(name);

		let updated = raw.toString().replace(/\$OG_TITLE/g, name);
		updated = updated.replace(/\$OG_DESCRIPTION/g, bodyText);
		updated = updated.replace(/\$OG_IMAGE/g, story.profilePic);
		res.send(updated);
	}
});

router.get('/category/:category', (req, res) => {
	const pathToIndex = path.join(
		__dirname,
		'..',
		'client',
		'build',
		'index.html'
	);
	const raw = fs.readFileSync(pathToIndex);
	let updated = raw
		.toString()
		.replace(/\$OG_TITLE/g, 'BITSian Stories - ' + req.params.category);
	updated = updated.replace(
		/\$OG_DESCRIPTION/g,
		'Bringing to you the experiences and anecdotes of some incredible BITSians who have done fantastic in the area of their interests!'
	);
	updated = updated.replace(
		/\$OG_IMAGE/g,
		'https://res.cloudinary.com/bitsianstories/image/upload/v1626503413/banner_gsd0fx.png'
	);
	res.send(updated);
});

router.get('/', (req, res) => {
	const pathToIndex = path.join(
		__dirname,
		'..',
		'client',
		'build',
		'index.html'
	);
	const raw = fs.readFileSync(pathToIndex);
	let updated = raw.toString().replace(/\$OG_TITLE/g, 'BITSian Stories');
	updated = updated.replace(
		/\$OG_DESCRIPTION/g,
		'Bringing to you the experiences and anecdotes of some incredible BITSians who have done fantastic in the area of their interests!'
	);
	updated = updated.replace(
		/\$OG_IMAGE/g,
		'https://res.cloudinary.com/bitsianstories/image/upload/v1626503413/banner_gsd0fx.png'
	);
	res.send(updated);
});

module.exports = router;
