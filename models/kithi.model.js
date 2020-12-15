var mongoose = require('mongoose')

var Schema = mongoose.Schema

var schema = new Schema({

    ma: String,
    tieude:String,
    matkhau:String,
    ngaythi: String,    
    hocki: String,    
    thoigian:Number,    
    trangthai: Boolean,
    tinhtrang: Number, // 0 da thi, 1 dang thi, 2 chua thi
 	 	
 	mon:{
		type:Schema.Types.ObjectId,
		ref:"Mon"
	},
	dethis:[{
		type:Schema.Types.ObjectId,
		ref:"DeThi"
	}],	
	dethidongs:[{
		type:Schema.Types.ObjectId,
		ref:"DeThi"
	}],	
	dethimos:[{
		type:Schema.Types.ObjectId,
		ref:"DeThi"
	}],	
	nhoms:[{
		type:Schema.Types.ObjectId,
		ref:"Nhom"
	}],
	giaovien:{
		type:Schema.Types.ObjectId,
		ref:"TaiKhoan"
	},
})

var KiThi = mongoose.model('KiThi', schema)

module.exports = KiThi