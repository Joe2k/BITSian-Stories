var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StorySchema = new Schema({
	title: {
		type: String,
	},
	body: {
		type: String,
	},
});

module.exports = Story = mongoose.model('stories', StorySchema);
