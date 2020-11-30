let DeThi = require('../models/dethi.model')
let Mon = require('../models/mon.model')
let Cauhoi = require('../models/cauhoi.model')
let KiThi = require('../models/kithi.model')
var shortid = require('shortid');

const methods = {
	index: async(req, res)=>{
		const dethi = await DeThi.find().populate('mon')
		res.send(dethi)
	},
	detail: async(req, res)=>{
		const _id = req.params.id
		const dethi = await DeThi.findById(_id)
		res.send(dethi)
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
	addQuestion: async(req, res)=>{
		//const _iddethi = req.params.id		
		const {cauhois, _iddethi} = req.body
		let dethi = await DeThi.findById(_iddethi)
		try{			
			if (cauhois){
				cauhois.forEach( async (item,idx)=>{
					dethi.cauhois.push(item)
					dethi.save()
					
					let cauhoi = await Cauhoi.findById(item)					
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
	removeQuestion: async(req, res)=>{
		//const _iddethi = req.params.id		
		const {_idcauhoi, _iddethi} = req.body		
		let dethi = await DeThi.findById(_iddethi).populate('mon')
		try{		
				// update de thi cua cau hoi
				dethi.cauhois.forEach(async (cauhoi,idx)=>{
					let each_cauhoi = await Cauhoi.findById(cauhoi)
					let newDethis = each_cauhoi.dethis.filter(x=> `${x}`!= _iddethi)
						each_cauhoi.dethis = newDethis
						each_cauhoi.save()
					if (idx===dethi.cauhois.length-1){
							// update cau hoi cua de thi	
						let newCauhoi = dethi.cauhois.filter(x=> `${x}` != _idcauhoi)
							dethi.cauhois = newCauhoi
							dethi.save().then(()=>{
								res.send({result_dethi:dethi})
							})
						//const result_dethi = await DeThi.findById(_iddethi).populate('mon')						
					}					
				})						
								
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
				
				res.json({
					result : "success",
					data: respone
				})
			})
						
		} catch(err){
			res.json({
				error : error 
			})
		}
	},
	// delete loaicauhoi (id)
	destroy: async(req, res)=>{
		let _iddethi = req.params.id
		//let user = await User.findById(id)
		try{
			const dethi = await DeThi.findById(_iddethi)
				if (dethi.cauhois.length>0){
					dethi.cauhois.forEach(async cauhoi=>{
						let each_cauhoi = await Cauhoi.findById(cauhoi)
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
				dethi.delete()
		} catch(err){
			res.send(err)
		}
		//res.send(user)
	}
}

module.exports = methods