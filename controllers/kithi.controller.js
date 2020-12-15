let Cauhoi = require('../models/cauhoi.model')
let DeThi = require('../models/dethi.model')
let KiThi = require('../models/kithi.model')
let Mon = require('../models/mon.model')
let Nhom = require('../models/nhom.model')
let TaiKhoan = require('../models/taikhoan.model')
var shortid = require('shortid');

const methods = {
	index: async (req, res)=>{
		const kithi = await KiThi.find().populate({
			path:'dethis',
			model:'DeThi',
			populate:{
				path:'mon',
				model:'Mon'
			}
		}).populate({
			path:'nhoms',
			model:'Nhom',
			populate:{
				path:'sinhviens',
				model:'TaiKhoan'
			}
		}).populate({
			path:'dethidongs',
			model : 'DeThi',
			populate:{
				path:'mon',
				model:'Mon'
			}
		}).populate({
			path:'dethimos',
			model : 'DeThi',
			populate:{
				path:'mon',
				model:'Mon'
			}
		})
		//.sort({'_id':-1})
		res.send(kithi)
	},
	updateStatus : async (req, res)=>{
		try{
			const {_idkithi} = req.params
			const kithi = await KiThi.findById(_idkithi)
				kithi.trangthai = !kithi.trangthai
				kithi.save()
			res.end()
		} catch(err){
			res.send(err)
		}
	},
	kithiCuaSV : async (req, res)=>{
		try{
			const {_idsv} = req.params
			const taikhoan = await TaiKhoan.findById(_idsv).populate({
				path:'nhoms',
				model:'Nhom',
				populate:{
					path:'kithis',
					model:'KiThi'					
				}			
			})
			res.send(taikhoan)
		} catch(err){
			res.send(err)
		}
	},
	detail : async (req, res)=>{
		try{
			const {_idkithi} = req.params
			const kithi = await KiThi.findById(_idkithi)
			res.send(kithi)
		} catch(err){
			res.send(err)
		}
	},
	questionOfExam : async (req, res)=>{
		const _iddethi = req.params.id		
		try{
			let cauhoi = []
			const dethi = await DeThi.findById(_iddethi).populate('cauhois').select('cauhois')
			
			cauhoi.push(dethi)
			
			//const cauhoi = await Cauhoi.find()
			res.send(cauhoi)
		} catch(err){
			res.send(err)
		}		
	},
	// add ki thi
	post: async (req, res)=>{
        const { ma, tieude, matkhau ,dethi, ngaythi, hocki, thoigian, mon,user } = req.body        
		const kithi = await new KiThi({
            ma: ma,
            tieude: tieude,            
            matkhau:matkhau,
            ngaythi: ngaythi,
            hocki: hocki,
            mon:mon,
            thoigian:thoigian,
            trangthai: 0,
            tinhtrang: 2,// chua thi
            giaovien:user._id
		})
		try{			
			kithi.save().then(async (respone)=>{
				const p_kithi = await KiThi.findById(respone._id).populate({
						path:'dethis',
						model:'DeThi',
						populate:{
							path:'mon',
							model:'Mon'
						}
					})
					p_kithi.dethis.push(dethi)		
					p_kithi.dethimos.push(dethi)					
					p_kithi.save()
				let p_dethi = await DeThi.findById(dethi)
				p_dethi.kithis.push(respone._id)
				p_dethi.save()

				res.send(p_kithi)
			})			
		} catch(err){
			res.json({
				error : error 
			})
		}
	},
	// delete cauhoi (id)
	destroy: async (req, res)=>{
		const {_idkithi} = req.params		
		try{			
			const kithi = await KiThi.findById(_idkithi)
				if(kithi.dethis.length > 0){
					kithi.dethis.forEach( async item=>{
						const dethi = await DeThi.findById(item)
							let newKithis = dethi.kithis.filter(x=> `${x}`!= _idkithi)
							dethi.kithis = newKithis
							dethi.save()
					})
				}
				if(kithi.nhoms.length > 0){
					kithi.nhoms.forEach( async item_n=>{
						const nhom = await Nhom.findById(item_n)
							let newKithis_n = nhom.kithis.filter(x=> `${x}`!= _idkithi)
							nhom.kithis = newKithis_n
							nhom.save()
					})
				}
				kithi.delete()
			res.send('ok')
		}catch(err){
			res.send(err)
		}
		//res.send(user)
	},
	themDeThi : async (req, res)=>{
		try{
			const {_idkithi, _iddethi} = req.body
			const dethi = await DeThi.findById(_iddethi)
				dethi.kithis.push(_idkithi)
				dethi.save()
			const kithi = await KiThi.findById(_idkithi).populate({
					path:'dethis',
					model:'DeThi',
					populate:{
						path:'mon',
						model:'Mon'
					}
				})
				kithi.dethis.push(_iddethi)
				kithi.dethimos.push(_iddethi)
				kithi.save()
			res.send(kithi)
		} catch(err){
			res.send(err)
		}
	},
	themNhom : async (req, res)=>{
		try{
			const {_idkithi, _idnhom} = req.body
			
			const nhom = await Nhom.findById(_idnhom)
				nhom.kithis.push(_idkithi)
				nhom.save()
			
			const kithi = await KiThi.findById(_idkithi).populate({
					path:'dethis',
					model:'DeThi',
					populate:{
						path:'mon',
						model:'Mon'
					}
				}).populate({
					path:'nhoms',
					model:'Nhom',
					populate:{
						path:'sinhviens',
						model:'TaiKhoan'
					}
				})

				kithi.nhoms.push(_idnhom)
				kithi.save().then(async ()=>{
					const kithi_result = await KiThi.findById(_idkithi).populate({
					path:'dethis',
					model:'DeThi',
					populate:{
						path:'mon',
						model:'Mon'
						}
					}).populate({
						path:'nhoms',
						model:'Nhom',
						populate:{
							path:'sinhviens',
							model:'TaiKhoan'
						}
					})	
					res.send(kithi_result)
				})		
		} catch(err){
			res.send(err)
		}
	},
	removeDethi : async (req, res)=>{
		try{
			const {_iddethi, _idkithi, dethirendermo, dethirenderdong} = req.body			
			
			const dethi = await DeThi.findById(_iddethi)
				const newKithis = dethi.kithis.filter(x => `${x}` != _idkithi)
				dethi.kithis = newKithis
				dethi.save()
			const kithi = await KiThi.findById(_idkithi)
				const newDethis = kithi.dethis.filter(x => `${x}` != _iddethi)
				kithi.dethis = newDethis
				kithi.dethimos = dethirendermo
				kithi.dethidongs = dethirenderdong
				kithi.save()			
			
			res.end()
		} catch(err){
			res.send(err)
		}
	},
	//remove nhom
	removeNhom : async (req, res)=>{
		try{
			const {_idnhom, _idkithi} = req.body			
			const kithi = await KiThi.findById(_idkithi)
				const newNhoms = kithi.nhoms.filter(x=>`${x}`!=_idnhom)
				kithi.nhoms = newNhoms
				kithi.save()
			const nhom = await Nhom.findById(_idnhom)
				const newKithis= nhom.kithis.filter(x=>`${x}`!=_idkithi)
				nhom.kithis = newKithis
				nhom.save()			
			
			res.end()
		} catch(err){
			res.send(err)
		}
	},
	loadDeCuaKiThi : async (req, res)=>{
		try{
			const {iddethis} = req.body
			let dethis = []
			if (iddethis.length >0){
				iddethis.forEach(async (_iddethi, idx) => {
					const dethi = await DeThi.findById(_iddethi)
					dethis.push(dethi)
					if (idx === iddethis.length-1){						
						res.send(dethis)
					}
				})
			}
		} catch(err){
			res.send(err)
		}
	},
	changeDongMo : async (req, res)=>{
		try{
			const {dedong, demo, _idkithi} = req.body	

			const kithi = await KiThi.findById(_idkithi)
				kithi.dethidongs = dedong
				kithi.dethimos = demo
				kithi.save()
		} catch(err){
			res.send(err)
		}
	},
	DoiMatKhau : async (req, res) => {
		try{
			const {_idkithi, mkmoi} = req.body
			const kithi = await KiThi.findById(_idkithi)
				kithi.matkhau = mkmoi
				kithi.save()
			res.end()
		} catch(err){
			res.send(err)
		}
	},
	tinhtrang : async (req, res) =>{
		try{
			const { _idkithi, tinhtrang } = req.body
			const kithi = await KiThi.findById(_idkithi)
				kithi.tinhtrang = tinhtrang
				kithi.save()
			res.send(kithi)
		} catch(err){
			res.send(err)
		}
	}
}

module.exports = methods