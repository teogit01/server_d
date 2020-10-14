var mongoose = require('mongoose')

var Schema = mongoose.Schema

var schema = new Schema({

    ma_cauhoi: String,
    ma_phuongan: String,
    
    
    

	create_at: {
		type: Date,
		default: Date.now
	},
	update_at: Date
})

var Cauhoi_phuongan = mongoose.model('Cauhoi_phuongan', schema)

module.exports = Cauhoi_phuongan