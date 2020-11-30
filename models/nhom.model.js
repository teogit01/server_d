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
    
	create_at: {
		type: Date,
		default: Date.now
	},
	update_at: Date
})

var Nhom = mongoose.model('Nhom', schema)

module.exports = Nhom