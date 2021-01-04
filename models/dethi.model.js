var mongoose = require('mongoose')

var Schema = mongoose.Schema

var schema = new Schema({

    ma: String,
    tieude:String,
    thoigian: Number,    
    namhoc: String,
    ghichu: String,
    trangthai: Number,
 	
 	cauhois:[{
		type:Schema.Types.ObjectId,
		ref:"CauHoi"
	}],

	mon:{
		type:Schema.Types.ObjectId,
		ref:"Mon"
	},

	kithis:[{
		type:Schema.Types.ObjectId,
		ref:"KiThi"
	}],
	taikhoan:{
		type:Schema.Types.ObjectId,
		ref:"TaiKhoan"
	}	
})

var DeThi = mongoose.model('DeThi', schema)

module.exports = DeThi