let Nhom = require('../models/nhom.model')
let TaiKhoan = require('../models/taikhoan.model')
let ThongBao = require('../models/thongbao.model')

var shortid = require('shortid');

const methods = {
	index: async(req, res)=>{
		const nhoms = await Nhom.find().populate('giaoviens').populate('thongbaos')		
		res.send(nhoms)
	},
	// nhom -> nhieu tai khoan
	post : async (req, res) => {
		try{			
			const {ma, ten, namhoc, giaovien} = req.body
			const nhom = await new Nhom({
				ma: ma,
				ten: ten,
				giaoviens:giaovien,
				namhoc: namhoc,
				trangthai: 0,
			})
			nhom.save().then(async respone=>{
				const taikhoan = await TaiKhoan.findById(giaovien)
					taikhoan.nhoms.push(respone)
					taikhoan.save()
				//res.send(respone)
				const nhoms = await Nhom.find().populate('giaoviens')
				res.send(nhoms)
			})			
		} catch (err){
			res.send(err)
		}
	},
	remove : async (req, res) => {
		try {
			const { _idnhom } = req.params
			const nhom = await Nhom.findById(_idnhom)	
			if (nhom.thongbaos.length>0){
				const thongbao = await ThongBao.deleteMany({nhom:_idnhom})
			}
			// cap nhat sinh vien va giao vien
			if (nhom.sinhviens.length>0){				
				nhom.sinhviens.forEach( async (_idsinhvien, index)=>{
					const taikhoan = await TaiKhoan.findById(_idsinhvien)
						const newNhoms = taikhoan.nhoms.filter(x=> `${x}`!= _idnhom)
							taikhoan.nhoms = newNhoms
							taikhoan.save()
							if(index === nhom.sinhviens.length - 1){
								nhom.giaoviens.forEach( async (_idgiaovien, idx) =>{

								const taikhoangv = await TaiKhoan.findById(_idgiaovien)
									const newNhomsgv = taikhoangv.nhoms.filter(x=> `${x}` != _idnhom)
									taikhoangv.nhoms = newNhomsgv
									taikhoangv.save()
									if (idx === nhom.giaoviens.length-1){
										nhom.delete()
										const nhoms = await Nhom.find().populate('giaoviens')
										res.send(nhoms)
									}
							})
						}
				})
			} else {				
				nhom.giaoviens.forEach( async (_idgiaovien, idx) =>{
					const taikhoangv = await TaiKhoan.findById(_idgiaovien)
						const newNhomsgv = taikhoangv.nhoms.filter(x=> `${x}` != _idnhom)
						taikhoangv.nhoms = newNhomsgv
						taikhoangv.save()
						if (idx === nhom.giaoviens.length-1){
							nhom.delete()
							const nhoms = await Nhom.find().populate('giaoviens')
							res.send(nhoms)
						}
				})
			}					
		} catch(err){
			res.send(err)
		}
	}
}

module.exports = methods