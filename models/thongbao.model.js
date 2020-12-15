var mongoose = require('mongoose')

var Schema = mongoose.Schema

var schema = new Schema({

    ma: String,        
    noidung: String,    
    ngay:String,
    gio:String,
 	 	
	nhom:{
		type:Schema.Types.ObjectId,
		ref:"Nhom"
	},
    	
})

var ThongBao = mongoose.model('ThongBao', schema)

module.exports = ThongBao