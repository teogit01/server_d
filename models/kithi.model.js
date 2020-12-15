var mongoose = require('mongoose')

var Schema = mongoose.Schema

var schema = new Schema({

    ma: String,
    tieude:String,
    matkhau:String,
    ngaythi: String,    
    hocki: String,    
    thoigian:Number,    
    trangthai: Number,
 	 	
 	mon:{
		type:Schema.Types.ObjectId,
		ref:"Mon"
	},
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

var KiThi = mongoose.model('KiThi', schema)

module.exports = KiThi