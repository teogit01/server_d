var mongoose = require('mongoose')

var Schema = mongoose.Schema

var schema = new Schema({
        
    tieude: String,
    noidung: String,    
    
    phuonganbaithis:[{
        type:Schema.Types.ObjectId,
        ref:"PhuongAn"
    }],
 	
    bailams:[{
        type:Schema.Types.ObjectId,
        ref:"BaiLam"
    }],

})

var CauHoiBaiThi = mongoose.model('CauHoiBaiThi', schema)

module.exports = CauHoiBaiThi