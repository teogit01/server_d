var mongoose = require('mongoose')

var Schema = mongoose.Schema

var schema = new Schema({

    ma: String,    
    thoigian: Number,    
    tgbd: String,
    tgkt: String,
    tgnb: String,
    dung: Number,
    sai: Number,
    diem: Number,
    ngay: String,
    
    kithi:Object,
    dethi:Object,
    
    sinhvien:{
    	type:Schema.Types.ObjectId,
		ref:"TaiKhoan"
    },    

    cauhois:[{
        type:Schema.Types.ObjectId,
        ref:"CauHoi"
    }], 	
	phuongans:[{
        type:Schema.Types.ObjectId,
        ref:"PhuongAn"
    }], 
})

var BaiThi = mongoose.model('BaiThi', schema)

module.exports = BaiThi