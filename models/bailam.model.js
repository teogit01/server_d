var mongoose = require('mongoose')

var Schema = mongoose.Schema

var schema = new Schema({

    ma: String,
    ten: String,
    tongdiem: String,
    
    

	create_at: {
		type: Date,
		default: Date.now
	},
	update_at: Date
})

var Bailam = mongoose.model('Bailam', schema)

module.exports = Bailam