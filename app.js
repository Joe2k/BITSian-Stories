require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Body-parser middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/* Connect to MongoDB */
require('./models/Story.js');
require('./config/mongoDB')();

// Cloudinary Config
require('./config/cloudinary')();

app.use('/api/story', require('./routes/story'));
app.use('/api/upload', require('./routes/upload'));

/* Frontend Routes */
const path = require('path');
const fs = require('fs');

app.use('', require('./routes/frontend'));

// app.get('/category/tech', (req, res) => {
// 	const raw = fs.readFileSync(pathToIndex);
// 	const pageTitle = 'Homepage - Welcome to my page';
// 	const updated = raw.toString().replace(/\$OG_TITLE/g, `${pageTitle}`);
// 	res.send(updated);
// });

app.use(express.static(path.join(__dirname, 'client', 'build')));

app.get('/*', function (req, res) {
	res.sendFile(
		path.join(__dirname, 'client', 'build', 'index.html'),
		function (err) {
			if (err) {
				res.status(500).send(err);
			}
		}
	);
});

app.use(require('./controllers/error'));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
