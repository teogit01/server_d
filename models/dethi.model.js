var mongoose = require('mongoose')

var Schema = mongoose.Schema

var schema = new Schema({

    ma: String,
    tieude:String,
    thoigian: Number,    
    namhoc: String,
    ghichu: String,
    trangthai: Number,
 	
 	cauhois:[{
		type:Schema.Types.ObjectId,
		ref:"Cauhoi"
	}],

	mon:{
		type:Schema.Types.ObjectId,
		ref:"Mon"
	},

	kithis:[{
		type:Schema.Types.ObjectId,
		ref:"KiThi"
	}],
    
	create_at: {
		type: Date,
		default: Date.now
	},
	update_at: Date
})

var DeThi = mongoose.model('DeThi', schema)

module.exports = DeThi