var mongoose = require('mongoose')

var Schema = mongoose.Schema

var schema = new Schema({

    ma: String,
    ten:String,      
    namhoc: String,
    ghichu: String,
    trangthai: Number,
 	
 	sinhviens:[{
		type:Schema.Types.ObjectId,
		ref:"TaiKhoan"
	}],
	giaoviens:[{
		type:Schema.Types.ObjectId,
		ref:"TaiKhoan"
	}],
	thongbaos:[{
		type:Schema.Types.ObjectId,
		ref:"ThongBao"
	}],
	kithis:[{
		type:Schema.Types.ObjectId,
		ref:"KiThi"
	}],
    
})

var Nhom = mongoose.model('Nhom', schema)

module.exports = Nhom