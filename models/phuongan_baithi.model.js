var mongoose = require('mongoose')

var Schema = mongoose.Schema

var schema = new Schema({

    ten: String,    
    noidung: String,
    dapan: Boolean,
    chon: Boolean,

    cauhoibaithi:{
		type:Schema.Types.ObjectId,
		ref:"CauHoiBaiThi"
	},	
	
})

var PhuongAnBaiThi = mongoose.model('PhuongAnBaiThi', schema)

module.exports = PhuongAnBaiThi