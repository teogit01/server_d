let CauHoi = require('../models/cauhoi.model')
let DeThi = require('../models/dethi.model')
let Mon = require('../models/mon.model')
let PhuongAn = require('../models/phuongan.model')
var shortid = require('shortid');

const methods = {
	index: async (req, res)=>{
		const cauhoi = await CauHoi.find().populate('mon')
		res.send(cauhoi)
	},

	detail : async (req, res)=>{
		const _idcauhoi = req.params.id

		const cauhoi = await CauHoi.findById(_idcauhoi)
		res.send(cauhoi)
	},
	// cau hoi cua mon
	questionOfSubject : async (req, res)=> {
		const {_idmon} = req.params
		try{
			let cauhois = await CauHoi.find({mon:_idmon}).populate('phuongans')
			res.send(cauhois)
		} catch(err){
			res.send(err)
		}
	},

	cauhoiCuaDethi : async (req, res)=>{
		const {_iddethi} = req.params
		try{
			let cauhois = []
			//const dethi = await DeThi.findById(_iddethi).populate('cauhois').select('cauhois')
			const dethi = await DeThi.findById(_iddethi).populate({
				path:'cauhois',
				model:'CauHoi',
				populate:{
					path:'phuongans',
					model:'PhuongAn'
				}
			})
			
			cauhois.push(dethi)
			res.send(cauhois)
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
            mon: mon,
            trangthai: 1,
		})
		try{
			cauhoi.save().then(async (respone)=>{
				let p_mon = await Mon.findById(mon)
				p_mon.cauhois.push(respone._id)
				p_mon.save()

				let result = await CauHoi.find().populate('mon')
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
	themCauHoi: async (req, res)=>{
		const {noidung, phuongans, _idmon} = req.body		
		try {			
			const cauhoi = await new CauHoi({				
				noidung: noidung,				
				mon:_idmon,
				trangthai:1
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
					phuongan.save().then(async (result_pa)=>{
						respone.phuongans.push(result_pa._id)
						respone.save()
					})
					if(idx === phuongans.length-1){
						let result_cauhoi = await CauHoi.findById(respone._id).populate('phuongans')
						let result_mon = await Mon.findById(_idmon).populate('cauhois')							
						res.send({result_cauhoi, result_mon})
					}									
				})
			})			
		} catch(err){
			res.send(err)
		}

	},
	// import cau hoi {_idmon, cauhois[]}
	import : async (req, res)=>{
		const arr =['A', 'B', 'C', 'D']	
		try{
			const {_idmon, cauhois} = req.body
			if(cauhois.length>0){				
				cauhois.forEach(async (item)=>{		
					let arrPA = []			
					const cauhoi = await new CauHoi({
						noidung: item['Nội dung'],
						mon:_idmon,
						trangthai:1
					})									
					const mon = await Mon.findById(_idmon)	
					const respone = await cauhoi.save()
						mon.cauhois.push(respone._id)
						mon.save()
					const phuongana = await new PhuongAn({
						ten:'A',
						noidung: item['Phương án A'],
						dapan: item['Đáp án'] === 'A' ? true : false,
						cauhoi:respone._id,
						trangthai:1
					})
					const phuonganb = await new PhuongAn({
						ten:'B',
						noidung: item['Phương án B'],
						dapan: item['Đáp án'] === 'B' ? true : false,
						cauhoi:respone._id,
						trangthai:1
					})

					const phuonganc = await new PhuongAn({
						ten:'C',
						noidung: item['Phương án C'],
						dapan: item['Đáp án'] === 'C' ? true : false,
						cauhoi:respone._id,
						trangthai:1
					})

					const phuongand = await new PhuongAn({
						ten:'D',
						noidung: item['Phương án D'],
						dapan: item['Đáp án'] === 'D' ? true : false,
						cauhoi:respone._id,
						trangthai:1
					})

					const result_paa = await phuongana.save()						
					arrPA.push(result_paa._id)
					const result_pab = await phuonganb.save()								
					arrPA.push(result_pab._id)
					const result_pac = await phuonganc.save()								
					arrPA.push(result_pac._id)
					const result_pad = await phuongand.save()								
					arrPA.push(result_pad._id)

					respone.phuongans = arrPA
					respone.save()
				})				
			}								
		//res.end()	
		} catch(err){
			res.send(err)
		}
	},
	// delete cauhoi (id)
	destroy: async (req, res)=>{	
		let _idcauhoi = req.params.id
		res.send('ok')

		const cauhoi = await CauHoi.findById(_idcauhoi).populate('dethis')
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
			//cauhoi.delete()
			if (cauhoi.bailams.length===0){
				cauhoi.delete()
			} else {
				cauhoi.trangthai = 0
				cauhoi.save()
			}
			res.send('ok')
		}catch(err){
			res.send(err)
		}
		//res.send(user)
	},
	removeCauHoi: async (req, res)=>{
		const {_idcauhoi, _idmon} = req.body

		try{
			const cauhoi = await CauHoi.findById(_idcauhoi)
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
				
				if (cauhoi.baithis.length === 0){
					let phuongan = await PhuongAn.deleteMany({cauhoi:_idcauhoi})
					cauhoi.delete()					
				} else {
					let phuongans = await PhuongAn.find({cauhoi:_idcauhoi})
						phuongans.forEach(async phuongan=>{
							phuongan.trangthai = 0
							phuongan.save()
						})
					cauhoi.trangthai = 0
					cauhoi.save()
				}
				
				const result_mon = await Mon.findById(_idmon).populate('cauhois') 
				res.send({result_mon})
								

		} catch(err){
			res.send(err)
		}
	}	
}

module.exports = methods