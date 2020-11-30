var mongoose = require('mongoose')

var Schema = mongoose.Schema

var schema = new Schema({

    ten: String,    
    noidung: String,
    dapan: Boolean,

    cauhoi:{
		type:Schema.Types.ObjectId,
		ref:"Cauhoi"
	},
	
	create_at: {
		type: Date,
		default: Date.now
	},
	update_at: Date
})

var PhuongAn = mongoose.model('PhuongAn', schema)

module.exports = PhuongAn