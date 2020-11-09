var mongoose = require('mongoose')

var Schema = mongoose.Schema

var schema = new Schema({

    ma: String,
    ten: String,
    
	create_at: {
		type: Date,
		default: Date.now
	},
	update_at: Date
})

var Lop = mongoose.model('Lop', schema)

module.exports = Lop