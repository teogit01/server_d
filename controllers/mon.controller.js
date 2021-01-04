let Mon = require('../models/mon.model')
let CauHoi = require('../models/cauhoi.model')
let TaiKhoan = require('../models/taikhoan.model')
let DeThi = require('../models/dethi.model')
var shortid = require('shortid');

const methods = {
	index: async(req, res)=>{		
		const mons = await Mon.find().populate({
			path:'cauhois',
			model:'CauHoi',
			populate:{
				path:'phuongans',
				model:'PhuongAn'
			}
		})
		res.send({mons:mons})
	},
	// add mon
	add: async (req, res)=>{        
		try{	
			const { ma, ten, _iduser } = req.body        	        
			const mon = new Mon({
	            ma: ma,
	            ten: ten,
	            giaovien:_iduser                             
			})		
			mon.save().then( async response=>{
				const taikhoan = await TaiKhoan.findById(_iduser)
					taikhoan.mons.push(response._id)
					taikhoan.save()
				res.send({mon:mon})
			})
					
		} catch(err){
			res.send(err)
		}

	},	
	// delete loaicauhoi (id)
	remove: async (req, res)=>{
		try{
			const {_idmon} = req.params			
			const mon = await Mon.findById(_idmon)
				mon.delete()				
			//delete all cau hoi cua mon
			const cauhoi = await CauHoi.deleteMany({'mon':_idmon})
			// delete mon trong de thi
			const dethi = await DeThi.deleteMany({'mon':_idmon})			
			res.end()
		} catch(err){
			res.send(err)
		}
	},
	chitiet : async (req, res)=>{
		try{
			const {_idmon}=req.body
			const mon = await Mon.findById(_idmon).populate({
				path:'cauhois',
				model:'CauHoi',
				populate:{
					path:'phuongans',
					model:'PhuongAn'
				}
			})
			res.send({mon:mon})
		} catch(err){
			res.send(err)
		}
	},
	mongiaovien : async (req,res)=>{
		try{
			const {_idgv} = req.body
			const mons = await Mon.find({giaovien:_idgv})
			res.send({mons:mons})
		} catch(err){
			res.send(err)
		}
	}
}

module.exports = methods