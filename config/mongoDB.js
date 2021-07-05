const mongoose = require('mongoose');
require('dotenv').config();

const mongoDBSetup = () => {
	// DB Config
	const db = process.env.MONGO_URI;

	mongoose
		.connect(db, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
		})
		.then(() => console.log('MongoDB successfully connected'))
		.catch((err) => console.log(err));
};

module.exports = mongoDBSetup;
