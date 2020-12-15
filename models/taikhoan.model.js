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
    hinhanh: String,
 	
    nhoms:[{
		type:Schema.Types.ObjectId,
		ref:"Nhom"
	}],
    kithis:[{
        type:Schema.Types.ObjectId,
        ref:"KiThi"
    }],
    baithis:[{
        type:Schema.Types.ObjectId,
        ref:"BaiThi"
    }],

})

var TaiKhoan = mongoose.model('TaiKhoan', schema)

module.exports = TaiKhoan