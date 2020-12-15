let CauHoiBaiThi = require('../models/cauhoi_baithi.model')

var shortid = require('shortid');

const methods = {
	index: async (req, res)=>{
		const cauhoi = await CauHoiBaiThi.find()
		res.send(cauhoi)
	}
}

module.exports = methods