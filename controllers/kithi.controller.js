let Cauhoi = require('../models/cauhoi.model')
let DeThi = require('../models/dethi.model')
let KiThi = require('../models/kithi.model')
let Mon = require('../models/mon.model')
var shortid = require('shortid');

const methods = {
	index: async(req, res)=>{
		const kithi = await KiThi.find().populate({
			path:'dethi',
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
        let { ma, tieude, dethi, ngay, hocki, batdau, ketthuc } = req.body
        
        // let ma = req.body.ma
        // let ten = req.body.ten

		const kithi = await new KiThi({
            ma: ma,
            tieude: tieude,
            dethi: dethi,
            ngaythi: ngay,
            hocki: hocki,
            batdau: batdau,
            ketthuc: ketthuc,
            trangthai: 0

		})
		try{
			kithi.save().then(async (respone)=>{
				let p_dethi = await DeThi.findById(dethi)
				p_dethi.kithis.push(respone._id)
				p_dethi.save()
				
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
	// delete cauhoi (id)
	destroy: async(req, res)=>{			
		try{			
			res.send('ok')
		}catch(err){
			res.send(err)
		}
		//res.send(user)
	}
}

module.exports = methods