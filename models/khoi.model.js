var mongoose = require('mongoose')

var Schema = mongoose.Schema

var schema = new Schema({

    ma: String,
    ten: String,
    
    mons:[{
		type:Schema.Types.ObjectId,
		ref:"Mon"
	}],

    
	create_at: {
		type: Date,
		default: Date.now
	},
	update_at: Date
})

var Khoi = mongoose.model('Khoi', schema)

module.exports = Khoi