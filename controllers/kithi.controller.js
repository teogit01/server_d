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
			console.log('ok')
			console.log(_idkithi)
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
		try{			
			const { ma, tieude, matkhau ,dethi, ngaythi, hocki, thoigian, mon, giaovien } = req.body        
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
	            giaovien:giaovien._id
			})
			kithi.save().then(async response=>{
				const taikhoan = await TaiKhoan.findById(giaovien._id)
			 		taikhoan.kithis.push(response._id)
			 		taikhoan.save()
			 	const p_mon = await Mon.findById(mon)
			 		p_mon.kithis.push(response._id)
			 		p_mon.save()
			 	const result = await KiThi.findById(response._id).populate({
			 		path:'dethis',
			 		model:'DeThi',			 		
			 	}).populate({
			 		path:'mon',
			 		model:'Mon'
			 	}).populate({
			 		path:'sinhviens',
			 		model:'TaiKhoan'
			 	})
			 	res.send({kithi:result})
			})			
			
		} catch(err){
			res.send(err)
		}
	},
	// delete cauhoi (id)
	destroy: async (req, res)=>{
		const {_idkithi, _iduser} = req.body
		try{		
			const taikhoan = await TaiKhoan.findById(_iduser)	
				const newKithis = taikhoan.kithis.filter(x=>`${x}` !== _idkithi)
				taikhoan.kithis = newKithis
				taikhoan.save()
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
			// dethis value label
			const {_idkithi, dethis} = req.body
			if(dethis.length>0){
				const kithi = await KiThi.findById(_idkithi)
					const newDethis = kithi.dethis
					dethis.forEach(async (item,index)=>{
						newDethis.push(item.value)
						if(index === dethis.length-1){
							kithi.dethis = newDethis
							kithi.save()
						}
					})					

				dethis.forEach(async (dt,idx)=>{
					const de = await DeThi.findById(dt.value)
						de.kithis.push(_idkithi)
						de.save().then(async ()=>{
							if (idx === dethis.length-1){

								const result = await KiThi.findById(_idkithi).populate('mon').populate({
									path:'nhoms',
									model:'Nhom'
								}).populate({
									path:'dethis',
									model:'DeThi'
								})
								res.send({kithi:result})
							}
						})
				})
			}
			// moi de thi pish ki thi			
		} catch(err){
			res.send(err)
		}
	},
	themNhom : async (req, res)=>{
		try{
			const {_idkithi, nhoms} = req.body
			const kithi = await KiThi.findById(_idkithi)
				const newNhoms = kithi.nhoms
			if (nhoms.length>0){
				nhoms.forEach(async (item,idx)=>{
					const nhom = await Nhom.findById(item.value)					
						nhom.kithis.push(_idkithi)
						newNhoms.push(item.value)
						nhom.save().then(async ()=>{
							if(idx===nhoms.length-1){
								kithi.nhoms = newNhoms
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
										res.send({kithi:kithi_result})
									})

								}
							})
						})
					}

			
			// const nhom = await Nhom.findById(_idnhom)
			// 	nhom.kithis.push(_idkithi)
			// 	nhom.save()
			
			// const kithi = await KiThi.findById(_idkithi).populate({
			// 		path:'dethis',
			// 		model:'DeThi',
			// 		populate:{
			// 			path:'mon',
			// 			model:'Mon'
			// 		}
			// 	}).populate({
			// 		path:'nhoms',
			// 		model:'Nhom',
			// 		populate:{
			// 			path:'sinhviens',
			// 			model:'TaiKhoan'
			// 		}
			// 	})

			// 	kithi.nhoms.push(_idnhom)
			// 	kithi.save().then(async ()=>{
			// 		const kithi_result = await KiThi.findById(_idkithi).populate({
			// 		path:'dethis',
			// 		model:'DeThi',
			// 		populate:{
			// 			path:'mon',
			// 			model:'Mon'
			// 			}
			// 		}).populate({
			// 			path:'nhoms',
			// 			model:'Nhom',
			// 			populate:{
			// 				path:'sinhviens',
			// 				model:'TaiKhoan'
			// 			}
			// 		})	
			// 		res.send(kithi_result)
				// })		
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
	},
	search : async (req, res) =>{
		try{
			const {key} = req.body
			const kithi = await KiThi.find()
		} catch (err){
			res.send(err)
		}
	},
	kithiCuaGV : async (req, res)=>{
		try{
			const {_idgv} = req.body
			const giaovien = await TaiKhoan.findById(_idgv).populate({
				path:'kithis',
				model:'KiThi',
				populate:{
					path:'dethis',
					model:'DeThi'
				}
			}).populate({
				path:'kithis',
				model:'KiThi',
				populate:{
					path:'nhoms',
					model:'Nhom'
				}
			}).populate({
				path:'kithis',
				model:'KiThi',
				populate:{
					path:'mon',
					model:'Mon'
				}
			})
			res.send({giaovien:giaovien})
		} catch(err){
			res.send(err)
		}
	}
}

module.exports = methods