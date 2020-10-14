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

var Loaicauhoi = mongoose.model('Loaicauhoi', schema)

module.exports = Loaicauhoi