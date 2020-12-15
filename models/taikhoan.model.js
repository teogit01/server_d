var mongoose = require('mongoose')
const bcrypt = require('bcrypt');

var Schema = mongoose.Schema

var schema = new Schema({
    
    maso: String,
    matkhau: String,
    ten: String,
    ngaysinh: String,
    gioitinh:String,
    sdt: String,    
    email: String,
    diachi: String,
    vaitro: Number,    // 0- admin/ 1 giaovien/ 2 sinh vien
 	matkhautam:String,
 	nhoms:[{
		type:Schema.Types.ObjectId,
		ref:"Nhom"
	}],	
    
	create_at: {
		type: Date,
		default: Date.now
	},
	update_at: Date
})

var TaiKhoan = mongoose.model('TaiKhoan', schema)

module.exports = TaiKhoan