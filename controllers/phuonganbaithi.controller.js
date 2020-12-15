let PhuongAnBaiThi = require('../models/phuongan_baithi.model')
var shortid = require('shortid');

const methods = {
	index: async(req, res)=>{
		const phuongan = await PhuongAnBaiThi.find()
		res.send(phuongan)
	},
}

module.exports = methods