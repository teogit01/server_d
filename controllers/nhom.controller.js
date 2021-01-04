let Nhom = require('../models/nhom.model')
let TaiKhoan = require('../models/taikhoan.model')
let ThongBao = require('../models/thongbao.model')

var shortid = require('shortid');

const methods = {
	index: async (req, res)=>{
		const nhoms = await Nhom.find().populate('giaoviens').populate('thongbaos')
		res.send({nhoms:nhoms})
	},
	detail : async (req, res)=>{
		try{
			const {_idnhom} = req.params
			const nhom = await Nhom.findById(_idnhom).populate({
				path:'sinhviens',
				model:'TaiKhoan'
			})
			res.send(nhom)
		} catch(err){
			res.send(err)
		}
	},
	giaovien : async (req, res) => {
		try{
			const {_idtaikhoan} = req.params
			//res.send(_idtaikhoan)
			const nhoms = await Nhom.find({giaoviens:_idtaikhoan}).populate('giaoviens').populate('thongbaos').populate('sinhviens')
			res.send(nhoms)
		} catch(err){
			res.send(err)
		}
	},
	sinhvien : async (req, res) => {
		try{
			const {_idtaikhoan} = req.params
			//res.send(_idtaikhoan)
			const nhoms = await Nhom.find({sinhviens:_idtaikhoan}).populate('giaoviens').populate('thongbaos')
			res.send(nhoms)
		} catch(err){
			res.send(err)
		}
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
					taikhoan.nhoms.push(respone._id)
					taikhoan.save()
				//res.send(respone)
				//const nhoms = await Nhom.find().populate('giaoviens')
				const result = await TaiKhoan.findById(giaovien).populate({
							path:'nhoms',
							model:'Nhom',
							populate:{
								path:'kithis',
								model:'KiThi',
								populate:{
									path:'dethis',
									model:'DeThi',
									populate:{
										path:'cauhois',
										model:'CauHoi',
										populate:{
											path:'phuongans',
											model:'PhuongAn'
										}
									}
								}
							}
						}).populate({
							path:'nhoms',
							model:'Nhom',
							populate:{
								path:'sinhviens',
								model:'TaiKhoan'					
							}
						}).populate({
							path:'nhoms',
							model:'Nhom',
							populate:{
								path:'thongbaos',
								model:'ThongBao'					
							}
						})
				// res.send(nhoms)
				res.send({result:result})
			})			
		} catch (err){
			res.send(err)
		}
	},
	nhomGiaoVien : async (req,res)=>{
		try{
			const {_idgv}=req.body
			const taikhoan = await TaiKhoan.findById(_idgv).populate({
				path:'nhoms',
				model:'Nhom'
			})
			res.send({taikhoan:taikhoan})
		}catch(err){
			res.send(err)
		}
	},
	remove : async (req, res) => {
		// nhom -> giaoviens
		// nhom -> sinhviens
		// nhom -> thongbaos
		// nhom -> kithis
		try {			
			const { _idnhom } = req.params
			const nhom = await Nhom.findById(_idnhom)			
			// if (nhom.thongbaos.length>0){
			const thongbao = await ThongBao.deleteMany({nhom:_idnhom})
			//}
			// cap nhat sinh vien va giao vien
			nhom.kithis.forEach(async _idkithi=>{
				const kithi = await KiThi.findById(_idkithi)
					const newNhoms = kithi.nhoms.filter(x=> `${x}` != _idnhom)
					kithi.nhom = newNhoms
					kithi.save()
			})
			nhom.sinhviens.forEach( async _idtaikhoan=>{
				const taikhoan_sv = await TaiKhoan.findById(_idtaikhoan)
					const newNhoms_sv = taikhoan_sv.nhoms.filter(x => `${x}`!= _idnhom)
					taikhoan_sv.nhoms = newNhoms_sv
					taikhoan_sv.save()
			})
			nhom.giaoviens.forEach( async _idtaikhoan=>{
				const taikhoan_gv = await TaiKhoan.findById(_idtaikhoan)
					const newNhoms_gv = taikhoan_gv.nhoms.filter(x => `${x}` != _idnhom)
					taikhoan_gv.nhoms = newNhoms_gv
					taikhoan_gv.save()
			})
			
			nhom.delete()
			res.end()				
		} catch(err){
			res.send(err)
		}
	}
}

module.exports = methods