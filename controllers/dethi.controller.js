let DeThi = require('../models/dethi.model')
let Mon = require('../models/mon.model')
let Cauhoi = require('../models/cauhoi.model')
let KiThi = require('../models/kithi.model')
var shortid = require('shortid');

const methods = {
	index: async(req, res)=>{
		const dethi = await DeThi.find()
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
				cauhois.forEach( async item=>{
					dethi.cauhois.push(item)
					dethi.save()
					
					let cauhoi = await Cauhoi.findById(item)					
						cauhoi.dethis.push(_iddethi)
						cauhoi.save()						
				})
			}			
			res.send(dethi)
		}catch(err){
			res.send(err)
		}			
	},
	// remove cau hoi cua de
	removeQuestion: async(req, res)=>{
		//const _iddethi = req.params.id		
		const {cauhois, _iddethi} = req.body		
		let dethi = await DeThi.findById(_iddethi)
		try{			
			if (dethi.cauhois && cauhois.length>0){							
				let diff = dethi.cauhois.filter(x=> cauhois.indexOf(`${x}`)=== -1)
				dethi.cauhois = diff
				dethi.save()

				//remove cau hoi
				cauhois.forEach(async item=>{
					let cauhoi_remove = await Cauhoi.findById(item) 
					let newDethis = cauhoi_remove.dethis.filter(x => `${x}` != _iddethi) 
					cauhoi_remove.dethis = newDethis
					cauhoi_remove.save()					
				})
			} 			
			res.send('ok')
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
		let id = req.params.id
		//let user = await User.findById(id)
		let bailam = await bailam.deleteOne({_id: id}).then(()=>{
			res.json({
				result: "delete sucessfully"
			})
		}).catch(err => res.json({
			error: err
		}))
		//res.send(user)
	}
}

module.exports = methods