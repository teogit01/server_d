let ThongBao = require('../models/thongbao.model')
let Nhom = require('../models/nhom.model')
var shortid = require('shortid');

const methods = {
	index: async(req, res)=>{		
		const thongbao = await ThongBao.find().populate('nhom')	
		res.send(thongbao)
	},
	thongBaoCuaNhom : async (req, res) => {
		try{
			const {_idnhom} = req.params
			const thongbaos = await ThongBao.find({'nhom':_idnhom})
			res.send(thongbaos)
		}catch(err){
			res.send(err)
		}
	},

	post : async (req, res) => {
		try{
			const {_idnhom, noidung, ngay, gio} = req.body
			const thongbao = await new ThongBao({
				ma: shortid.generate(),
				noidung:noidung,
				ngay:ngay,
				gio:gio,
				nhom:_idnhom,
			})
			thongbao.save().then(async respone=>{
				const nhom = await Nhom.findById(_idnhom)
					nhom.thongbaos.push(respone._id)
					nhom.save()
			})
			const thongbaos = await ThongBao.find({'nhom':_idnhom})
			res.send(thongbaos)
		} catch(err){
			res.send(err)
		}
	}
}

module.exports = methods