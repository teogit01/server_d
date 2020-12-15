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
					nhom.save().then(async ()=>{
						const thongbaos = await ThongBao.find({'nhom':_idnhom})			
						res.send(thongbaos)
					})
			})			
		} catch(err){
			res.send(err)
		}
	},	
	remove : async (req, res) => {
		// thongbao -> nhom
		// nhom -> thongbaos
		try{
			const {_idnhom, _idthongbao} = req.body
			const thongbao = await ThongBao.findById(_idthongbao)
				thongbao.delete()
			const nhom = await Nhom.findById(_idnhom)			
				const newThongbaos = nhom.thongbaos.filter(x=> `${x}` != _idthongbao)
				nhom.thongbaos = newThongbaos
				nhom.save()
			res.end()			
		} catch(err){
			res.send(err)
		}
	}
}

module.exports = methods