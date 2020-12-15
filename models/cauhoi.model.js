var mongoose = require('mongoose')

var Schema = mongoose.Schema

var schema = new Schema({
        
    tieude: String,
    noidung: String,    
    
    phuongans:[{
        type:Schema.Types.ObjectId,
        ref:"PhuongAn"
    }],

 	mon:{
		type:Schema.Types.ObjectId,
		ref:"Mon"
	},
    dethis:[{
        type:Schema.Types.ObjectId,
        ref:"DeThi"
    }],
    baithis:[{
        type:Schema.Types.ObjectId,
        ref:"BaiThi"
    }],
    trangthai:Number, // 0 xoa, 1 ton tai...

})

var CauHoi = mongoose.model('CauHoi', schema)

module.exports = CauHoi