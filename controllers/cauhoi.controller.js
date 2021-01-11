let CauHoi = require('../models/cauhoi.model')
let DeThi = require('../models/dethi.model')
let Mon = require('../models/mon.model')
let PhuongAn = require('../models/phuongan.model')
var shortid = require('shortid');

const methods = {
	index: async (req, res)=>{
		const cauhois = await CauHoi.find().populate('mon').populate('phuongans')
		res.send({cauhois:cauhois})
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
		try {			
			const {noidung, phuongans, _idmon} = req.body		
			const cauhoi = await new CauHoi({				
				noidung: noidung,				
				mon:_idmon,
				trangthai:1
			})			
					
			cauhoi.save().then(async respone=>{
				const mon = await Mon.findById(_idmon)
					mon.cauhois.push(respone._id)
					mon.save()						
				const array = []
				phuongans.forEach(async (pa, idx)=>{										
					const phuongan = await new PhuongAn({
						ten: pa.ten,
						noidung: pa.noidung,
						dapan: pa.dapan,
						cauhoi: respone._id
					})
					phuongan.save().then(async result_pa=>{
						array.push(result_pa._id)
						if(idx===3){
							respone.phuongans=array
							respone.save().then(async result=>{
								const result_cauhoi = await CauHoi.findById(result._id).populate('phuongans')
								const result_mon = await Mon.findById(_idmon).populate({
										path:'cauhois',
										model:'CauHoi',
										populate:{
											path:'phuongans',
											model:'PhuongAn'
										}
									})
								res.send({cauhoi:result_cauhoi,mon:result_mon})
							})

						}
					})																		
				})
			})			
		} catch(err){
			res.send(err)
		}
	},
	themCauHoiNhieu : async (req,res)=>{
		try{			
			// data _ array lable, value:_idcauhoi
			const {_idmon, arrCauhoi}=req.body			
			const mon = await Mon.findById(_idmon)
			if (arrCauhoi.length>0){				
				const arr = []
				arrCauhoi.forEach(cauhoi=>{
					arr.push(cauhoi.value)
				})				
				//const newArray = arr.concat(mon.cauhois)
				const newArray = mon.cauhois.concat(arr)
				mon.cauhois = newArray
				mon.save().then(async ()=>{
					const result = await Mon.findById(_idmon).populate({
						path:'cauhois',
						model:'CauHoi',
						populate:{
							path:'phuongans',
							model:'PhuongAn'
						}
					})
					res.send({mon:result})
				})
				
			}
		} catch (err){
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
		const {ch} = req.body

		try{
			const cauhoi = await CauHoi.findById(ch._id)
			const mon = await Mon.findById(ch.mon)
				let newCauhois = mon.cauhois.filter(x=> `${x}`!==ch.mon)
				mon.cauhois = newCauhois
				mon.save()

			// de thi
				cauhoi.dethis.forEach(async (dt, idx)=>{
					let dethi = await DeThi.findById(dt)
					let newCauhoiDeThi = dethi.cauhois.filter(x=> `${x}`!== ch._id)
						dethi.cauhois = newCauhoiDeThi
						dethi.save()

					// if(idx === cauhoi.dethis.length-1){

					// }
				})
			// phuong an				
				
				if (cauhoi.baithis.length === 0){
					let phuongan = await PhuongAn.deleteMany({cauhoi:ch._id})
					cauhoi.delete()					
				} else {
					let phuongans = await PhuongAn.find({cauhoi:ch._id})
						phuongans.forEach(async phuongan=>{
							phuongan.trangthai = 0
							phuongan.save()
						})
					cauhoi.trangthai = 0
					cauhoi.save()
				}
				
				const result_mon = await Mon.findById(ch.mon).populate('cauhois') 
				res.send({mon:result_mon})
								

		} catch(err){
			res.send(err)
		}
	},
	cauHoiCuaMon : async (req,res)=>{
		try{
			const {_idmon}=req.body
			const cauhois = await CauHoi.find({mon:_idmon}).populate({
				path:'phuongans',
				model:'PhuongAn'
			})
			res.send({cauhois:cauhois})
		}catch(err){
			res.send(err)
		}
	}
}

module.exports = methods