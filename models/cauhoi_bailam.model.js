var mongoose = require('mongoose')

var Schema = mongoose.Schema

var schema = new Schema({

    ma_cauhoi: String,
    ma_bailam: String,
    
    
    

	create_at: {
		type: Date,
		default: Date.now
	},
	update_at: Date
})

var Cauhoi_bailam = mongoose.model('Cauhoi_bailam', schema)

module.exports = Cauhoi_bailam