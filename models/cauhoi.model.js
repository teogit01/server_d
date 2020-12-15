var mongoose = require('mongoose')

var Schema = mongoose.Schema

var schema = new Schema({

    ma: String,
    tieude: String,
    noidung: String,
    
    loai:String,
   
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

	create_at: {
		type: Date,
		default: Date.now
	},
	update_at: Date
})

var Cauhoi = mongoose.model('Cauhoi', schema)

module.exports = Cauhoi