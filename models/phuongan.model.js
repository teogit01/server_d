var mongoose = require('mongoose')

var Schema = mongoose.Schema

var schema = new Schema({

    ma: String,
    ten: String,
    noidung: String,


	create_at: {
		type: Date,
		default: Date.now
	},
	update_at: Date
})

var Phuongan = mongoose.model('phuongan', schema)

module.exports = Phuongan