var mongoose = require('mongoose')

var Schema = mongoose.Schema

var schema = new Schema({

    ma: String,
    ten: String,
    phieudangki_ma: String,
    
    

	create_at: {
		type: Date,
		default: Date.now
	},
	update_at: Date
})

var Mon = mongoose.model('Mon', schema)

module.exports = Mon