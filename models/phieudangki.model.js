var mongoose = require('mongoose')

var Schema = mongoose.Schema

var schema = new Schema({

    ma: String,
    ten: String,
    ma_bailam: String,
    username_user: String,
    

	create_at: {
		type: Date,
		default: Date.now
	},
	update_at: Date
})

var Phieudangki = mongoose.model('Phieudangki', schema)

module.exports = Phieudangki