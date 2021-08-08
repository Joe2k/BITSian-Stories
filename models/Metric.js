var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var metricSchema = new Schema({
	name: {
		type: String,
	},
	count: {
		type: Number,
		default: 0,
	},
});

module.exports = Metric = mongoose.model('metrics', metricSchema);
