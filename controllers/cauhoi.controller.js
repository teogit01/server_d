let Cauhoi = require('../models/cauhoi.model')
let DeThi = require('../models/dethi.model')
let Mon = require('../models/mon.model')
let PhuongAn = require('../models/phuongan.model')
var shortid = require('shortid');

const methods = {
	index: async (req, res)=>{
		const cauhoi = await Cauhoi.find().populate('mon')
		res.send(cauhoi)
	},

	detail : async (req, res)=>{
		const _idcauhoi = req.params.id

		const cauhoi = await Cauhoi.findById(_idcauhoi)
		res.send(cauhoi)
	},
	// cau hoi cua mon
	questionOfSubject : async (req, res)=> {
		const {_idmon} = req.params
		try{
			let cauhois = await Cauhoi.find({mon:_idmon}).populate('phuongans')
			res.send(cauhois)
		} catch(err){
			res.send(err)
		}
	},

	questionOfExam : async (req, res)=>{
		const _iddethi = req.params.id		
		try{
			let cauhoi = []
			//const dethi = await DeThi.findById(_iddethi).populate('cauhois').select('cauhois')
			const dethi = await DeThi.findById(_iddethi).populate({
				path:'cauhois',
				model:'Cauhoi',
				populate:{
					path:'phuongans',
					model:'PhuongAn'
				}
			})
			
			cauhoi.push(dethi)
			
			//const cauhoi = await Cauhoi.find()
			res.send(cauhoi)
		} catch(err){
			res.send(err)
		}		
	},

	// add cau hoi 
	post: async (req, res)=>{
        let { tieude, noidung, phuongan, loai, mon } = req.body
        
        // let ma = req.body.ma
        // let ten = req.body.ten

		const cauhoi = await new Cauhoi({
            ma: shortid.generate(),
            tieude: tieude,
            noidung: noidung,
            loai: loai,
            phuongan:phuongan,
            mon: mon
		})
		try{
			cauhoi.save().then(async (respone)=>{
				let p_mon = await Mon.findById(mon)
				p_mon.cauhois.push(respone._id)
				p_mon.save()

				let result = await Cauhoi.find().populate('mon')
				res.json({
					result : "success",
					data: result
				})
			})			
		} catch(err){
			res.json({
				error : error 
			})
		}
	},
	// add question
	addQuestion: async (req, res)=>{
		const {noidung, phuongans, _idmon} = req.body
		try {
			const cauhoi = await new Cauhoi({
				ma:shortid.generate(),
				noidung: noidung,
				loai: 0,
				mon:_idmon
			})
					
			cauhoi.save().then(async respone=>{
				const mon = await Mon.findById(_idmon)
					mon.cauhois.push(respone._id)
					mon.save()
				phuongans.forEach(async (pa, idx)=>{
					let phuongan = await new PhuongAn({
						ten: pa.ten,
						noidung: pa.noidung,
						dapan: pa.dapan,
						cauhoi: respone._id
					})
					phuongan.save().then(async result=>{
						let p_cauhoi = await Cauhoi.findById(respone._id)
							p_cauhoi.phuongans.push(result._id)
							p_cauhoi.save()

						if(idx === phuongans.length-1){
							let result_cauhoi = await Cauhoi.findById(respone._id).populate('phuongans')
							let result_mon = await Mon.findById(_idmon).populate('cauhois')
							res.send({result_cauhoi, result_mon})
						}	
					})					
				})
			})			
		} catch(err){
			res.send(err)
		}

	},
	// delete cauhoi (id)
	destroy: async (req, res)=>{	
		let _idcauhoi = req.params.id

		const cauhoi = await Cauhoi.findById(_idcauhoi).populate('dethis')
		try{			
			const mon = await Mon.findById(cauhoi.mon)						
			if(mon.cauhois){
				let newCauhoi = mon.cauhois.filter(x=>`${x}`!= _idcauhoi)
				mon.cauhois = newCauhoi
				mon.save()
			}			
			if(cauhoi.dethis.length > 0){
				cauhois.dethi.forEach(async item=>{
					let dethi = await DeThi.findById(item)
					let newCauhoi = dethi.filter(x => `${x}`!= _idcauhoi)
					dethi.cauhois = newCauhoi
					dethi.save()
				})
			}
			//res.send(cauhoi.mon)
			cauhoi.delete()
			res.send('ok')
		}catch(err){
			res.send(err)
		}
		//res.send(user)
	},
	removeCauHoi: async (req, res)=>{
		const {_idcauhoi, _idmon} = req.body

		try{
			const cauhoi = await Cauhoi.findById(_idcauhoi)
			const mon = await Mon.findById(cauhoi.mon)
				let newCauhois = mon.cauhois.filter(x=> `${x}`!==_idcauhoi)
				mon.cauhois = newCauhois
				mon.save()

			// de thi
				cauhoi.dethis.forEach(async (dt, idx)=>{
					let dethi = await DeThi.findById(dt)
					let newCauhoiDeThi = dethi.cauhois.filter(x=> `${x}`!== _idcauhoi)
						dethi.cauhois = newCauhoiDeThi
						dethi.save()

					// if(idx === cauhoi.dethis.length-1){

					// }
				})
			// phuong an
				let phuongan = await PhuongAn.deleteMany({cauhoi:_idcauhoi})
				cauhoi.delete()
				
				const result_mon = await Mon.findById(_idmon).populate('cauhois') 
				res.send({result_mon})
								

		} catch(err){
			res.send(err)
		}
	}	
}

module.exports = methods