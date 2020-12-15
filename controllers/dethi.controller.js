let DeThi = require('../models/dethi.model')
let Mon = require('../models/mon.model')
let CauHoi = require('../models/cauhoi.model')
let KiThi = require('../models/kithi.model')
var shortid = require('shortid');

const methods = {
	index: async(req, res)=>{
		const dethi = await DeThi.find().populate('mon')
		res.send(dethi)
	},
	detail: async(req, res)=>{
		try{
			const {_iddethi} = req.params
			const dethi = await DeThi.findById(_iddethi).populate({
				path:'cauhois',
				model:'CauHoi',
				populate:{
					path:'phuongans',
					model: 'PhuongAn'
				}
			})
			res.send(dethi)
		} catch(err){
			res.send(err)
		}
	},
	// de thi cua mon
	testOfSubject : async (req, res) => {
		const {_idmon} = req.params				
		try{			
			const dethis = await DeThi.find({mon:_idmon})
			//console.log('dethi',dethis)
			res.send(dethis)			
		} catch(err){
			res.send(err)
		}
	},
	addQuestion: async (req, res)=>{			
		try{			
			const {cauhois, _iddethi} = req.body
			let dethi = await DeThi.findById(_iddethi)
			if (cauhois){
				cauhois.forEach( async (item,idx)=>{
					dethi.cauhois.push(item)
					dethi.save()
					
					let cauhoi = await CauHoi.findById(item)					
						cauhoi.dethis.push(_iddethi)
						cauhoi.save()	

					if (idx === cauhois.length-1){
						const result_dethi = await DeThi.findById(_iddethi).populate('mon')						
						res.send({result_dethi})
					}					
				})
			}			
			// res.send(dethi)
		}catch(err){
			res.send(err)
		}			
	},
	// remove cau hoi cua de
	removeCauhoi: async (req, res)=>{			
		try{		
			const {_idcauhoi, _iddethi} = req.body		
			let dethi = await DeThi.findById(_iddethi).populate('mon')
				// update de thi cua cau hoi
				const newCauhois = dethi.cauhois.filter(x => `${x}`!= _idcauhoi)
					dethi.cauhois = newCauhois
					dethi.save()
				const cauhoi = await CauHoi.findById(_idcauhoi)
					const newDethis = cauhoi.dethis.filter(x => `${x}` != _iddethi)
					cauhoi.dethis = newDethis
					cauhoi.save()
				res.send({result_dethi:dethi})

				// dethi.cauhois.forEach(async (cauhoi,idx)=>{
				// 	let each_cauhoi = await CauHoi.findById(cauhoi)
				// 	let newDethis = each_cauhoi.dethis.filter(x=> `${x}`!= _iddethi)
				// 		each_cauhoi.dethis = newDethis
				// 		each_cauhoi.save()
				// 	if (idx===dethi.cauhois.length-1){
				// 			// update cau hoi cua de thi	
				// 		let newCauhoi = dethi.cauhois.filter(x=> `${x}` != _idcauhoi)
				// 			dethi.cauhois = newCauhoi
				// 			dethi.save().then(()=>{
				// 				res.send({result_dethi:dethi})
				// 			})
				// 		//const result_dethi = await DeThi.findById(_iddethi).populate('mon')						
				// 	}					
				// })						
								
		}catch(err){
			res.send(err)
		}			
	},
	// create De Thi
	post: async(req, res)=>{        		
        let { ma, thoigian, namhoc, tieude, ghichu, mon} = req.body               
		const dethi = new DeThi({
			ma: ma,
			tieude:tieude,
			thoigian: thoigian,
			namhoc: namhoc,
			ghichu: ghichu,
			mon:mon,
			trangthai: 0,
		})
		try{					
			dethi.save().then( async (respone)=>{
				// dethi->mon
				let p_mon = await Mon.findById(mon)
					p_mon.dethis.push(respone._id)
					p_mon.save()
				const dethi_result = await DeThi.findById(respone._id).populate('mon')
				res.send(dethi_result)
			})
						
		} catch(err){
			res.json({
				error : error 
			})
		}
	},
	// delete loaicauhoi (id)
	remove: async (req, res)=>{		
	//mon, kithis, cauhois		
		try{
			const {_iddethi} = req.params
			const dethi = await DeThi.findById(_iddethi)
				
			if (dethi.cauhois.length>0){
				dethi.cauhois.forEach(async cauhoi=>{
					let each_cauhoi = await CauHoi.findById(cauhoi)
					let newDethis = each_cauhoi.dethis.filter(x=> `${x}` != _iddethi)
						each_cauhoi.dethis = newDethis
						each_cauhoi.save()
				})
			}
			if (dethi.kithis.length>0){
				dethi.kithis.forEach(async kithi=>{
					let each_kithi = await KiThi.findById(kithi)
					let newKithis = each_kithi.dethis.filter(x=> `${x}` != _iddethi)
						each_kithi.dethis = newKithis
						each_kithi.save()
				})
			}
			const mon = await Mon.findById(dethi.mon)
				let newDethis_mon = mon.dethis.filter(x=> `${x}` != _iddethi)
					mon.dethis = newDethis_mon
					mon.save()
			dethi.delete()
			res.end()
		} catch(err){
			res.send(err)
		}
		//res.send(user)
	}
}

module.exports = methods