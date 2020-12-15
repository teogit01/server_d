var mongoose = require('mongoose')

var Schema = mongoose.Schema

var schema = new Schema({

    ten: String,    
    noidung: String,
    dapan: Boolean,

    cauhoi:{
		type:Schema.Types.ObjectId,
		ref:"CauHoi"
	},
	
	trangthai: Number, // 0 cau hoi bi xoa
})

var PhuongAn = mongoose.model('PhuongAn', schema)

module.exports = PhuongAn