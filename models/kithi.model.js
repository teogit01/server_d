var mongoose = require('mongoose')

var Schema = mongoose.Schema

var schema = new Schema({

    ma: String,
    tieude:String,

    ngaythi: String,
    
    batdau: String,    
    ketthuc: String, 

    hocki: String,    
    trangthai: Number,
 	 	
	dethi:{
		type:Schema.Types.ObjectId,
		ref:"DeThi"
	},	
    
	create_at: {
		type: Date,
		default: Date.now
	},
	update_at: Date
})

var KiThi = mongoose.model('KiThi', schema)

module.exports = KiThi