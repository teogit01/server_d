var mongoose = require('mongoose')

var Schema = mongoose.Schema

var schema = new Schema({

    ma: String,
    ten: String,

    khois:[{
		type:Schema.Types.ObjectId,
		ref:"Khoi"
	}],
	cauhois:[{
		type:Schema.Types.ObjectId,
		ref:"Cauhoi"
	}],
	dethis:[{
		type:Schema.Types.ObjectId,
		ref:"DeThi"
	}],
    
	create_at: {
		type: Date,
		default: Date.now
	},
	update_at: Date
})

var Mon = mongoose.model('Mon', schema)

module.exports = Mon