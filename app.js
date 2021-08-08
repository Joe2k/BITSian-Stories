require('dotenv').config();
const newrelic = require('newrelic');
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const app = express();

// Body-parser middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

/* Connect to MongoDB */
require('./models/Story.js');
require('./models/Metric.js');
require('./config/mongoDB')();

// Cloudinary Config
require('./config/cloudinary')();

app.use('/api/story', require('./routes/story'));
app.use('/api/upload', require('./routes/upload'));

/* Frontend Routes */
const path = require('path');
const fs = require('fs');

app.use('', require('./routes/frontend'));
app.use(express.static(path.join(__dirname, 'client', 'build')));

app.get('/*', function (req, res) {
	const pathToIndex = path.join(__dirname, 'client', 'build', 'index.html');
	const raw = fs.readFileSync(pathToIndex);
	let updated = raw.toString().replace(/\$OG_TITLE/g, 'BITSian Stories');
	updated = updated.replace(
		/\$OG_DESCRIPTION/g,
		'Untold Stories of Students from BITS Pilani, Hyderabad Campus'
	);
	updated = updated.replace(/\$OG_IMAGE/g, '');
	res.send(updated);
});

app.use(require('./controllers/error'));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));

setInterval(function sampleMemory() {
	var stats = process.memoryUsage();

	newrelic.recordCustomEvent('NodeMemory', stats);
}, 5000);

if (process.cpuUsage) {
	var lastUsage;

	// sampling interval in milliseconds

	var interval = 60000;

	setInterval(function sampleCpu() {
		// get CPU usage since the process started

		var usage = process.cpuUsage();

		if (lastUsage) {
			// calculate percentage

			var intervalInMicros = interval * 1000;

			var userPercent =
				((usage.user - lastUsage.user) / intervalInMicros) * 100;

			newrelic.recordCustomEvent('NodeCPU', { userPercent: userPercent });
		}

		lastUsage = usage;
	}, interval);
}
