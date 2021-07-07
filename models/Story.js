var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StorySchema = new Schema({
	title: {
		type: String,
	},
	body: {
		type: String,
	},
	profilePic: {
		type: String,
	},
	category: {
		type: String,
	},
	urls: {
		linkedin: {
			type: String,
		},
		facebook: {
			type: String,
		},
		github: {
			type: String,
		},
		instagram: {
			type: String,
		},
		email: {
			type: String,
		},
	},
	tags: [
		{
			text: {
				type: String,
			},
		},
	],
});

module.exports = Story = mongoose.model('stories', StorySchema);
