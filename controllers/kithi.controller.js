let Cauhoi = require('../models/cauhoi.model')
let DeThi = require('../models/dethi.model')
let KiThi = require('../models/kithi.model')
let Mon = require('../models/mon.model')
var shortid = require('shortid');

const methods = {
	index: async(req, res)=>{
		const kithi = await KiThi.find().populate({
			path:'dethis',
			model:'DeThi',
			populate:{
				path:'mon',
				model:'Mon'
			}
		})
		res.send(kithi)
	},

	detail : async(req, res)=>{
		const _idcauhoi = req.params.id

		const cauhoi = await Cauhoi.findById(_idcauhoi)
		res.send(cauhoi)
	},

	questionOfExam : async(req, res)=>{
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
	post: async(req, res)=>{
        const { ma, tieude, matkhau ,dethi, ngaythi, hocki, thoigian, mon } = req.body        
		const kithi = await new KiThi({
            ma: ma,
            tieude: tieude,            
            matkhau:matkhau,
            ngaythi: ngaythi,
            hocki: hocki,
            mon:mon,
            thoigian:thoigian,
            trangthai: 0,

		})
		try{			
			kithi.save().then(async (respone)=>{
				const p_kithi = await KiThi.findById(respone._id)
					p_kithi.dethis.push(dethi)
					p_kithi.save()
				let p_dethi = await DeThi.findById(dethi)
				p_dethi.kithis.push(respone._id)
				p_dethi.save()
				
				res.send(respone)
			})			
		} catch(err){
			res.json({
				error : error 
			})
		}
	},
	// delete cauhoi (id)
	destroy: async(req, res)=>{			
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
			const kithi = await KiThi.findById(_idkithi)
				kithi.dethis.push(_iddethi)
				kithi.save().then(respone =>{					
					res.send(respone)
				})					
		} catch(err){
			res.send(err)
		}
	}
}

module.exports = methods