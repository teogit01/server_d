var mongoose = require('mongoose')

var Schema = mongoose.Schema

var schema = new Schema({

    ma: String,
    ten: String,
    
	cauhois:[{
		type:Schema.Types.ObjectId,
		ref:"CauHoi"
	}],
	dethis:[{
		type:Schema.Types.ObjectId,
		ref:"DeThi"
	}],
	kithis:[{
		type:Schema.Types.ObjectId,
		ref:"KiThi"
	}],
	giaovien:{
		type:Schema.Types.ObjectId,
		ref:"TaiKhoan"
	},
    
})

var Mon = mongoose.model('Mon', schema)

module.exports = Mon