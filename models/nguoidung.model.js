var mongoose = require('mongoose')

var Schema = mongoose.Schema

var schema = new Schema({
	tendangnhap: String,
	matkhau: String,
	
	hoten: String,
	gmail: String,
	sodienthoai: Date,
	anh: String,
	diachi: String,

	id_role: String,
	
	create_at: {
		type: Date,
		default: Date.now
	},
	update_at: Date
})

var Nguoidung = mongoose.model('Nguoidung', schema)

module.exports = Nguoidung