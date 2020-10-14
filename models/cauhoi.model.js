var mongoose = require('mongoose')

var Schema = mongoose.Schema

var schema = new Schema({

    ma: String,
    ten: String,
    noidung: String,
    
    ma_loai: String,

	create_at: {
		type: Date,
		default: Date.now
	},
	update_at: Date
})

var Cauhoi = mongoose.model('Cauhoi', schema)

module.exports = Cauhoi