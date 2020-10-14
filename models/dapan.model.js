var mongoose = require('mongoose')

var Schema = mongoose.Schema

var schema = new Schema({

    ma: String,
    ten: String,
    noidung: String,
    
    ma_cauhoi: String,

	create_at: {
		type: Date,
		default: Date.now
	},
	update_at: Date
})

var Dapan = mongoose.model('Dapan', schema)

module.exports = Dapan