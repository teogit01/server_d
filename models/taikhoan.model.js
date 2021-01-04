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
    trangthai:Number, // 0- cho admin duyet, 1- dang hoat dong, 2- bi khoa
 	
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
    mons:[{
        type:Schema.Types.ObjectId,
        ref:"Mon"
    }],
    dethis:[{
        type:Schema.Types.ObjectId,
        ref:"DeThi"
    }],

})

var TaiKhoan = mongoose.model('TaiKhoan', schema)

module.exports = TaiKhoan