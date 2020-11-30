var mongoose = require('mongoose')

var Schema = mongoose.Schema

var schema = new Schema({

    _idkhoi: String,
    _idmon: String,

    khoi:{
		type: Schema.Types.ObjectId,
		ref: "Khoi"
	},
	mon:{
		type: Schema.Types.ObjectId,
		ref: "Mon"
	},
    	
})

var Khoi_Mon = mongoose.model('Khoi_Mon', schema)

module.exports = Khoi_Mon