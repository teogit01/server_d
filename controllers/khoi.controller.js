let Khoi = require('../models/khoi.model')
let Mon = require('../models/mon.model')
var shortid = require('shortid');

const methods = {
	index: async(req, res)=>{		
		const khoi = await Khoi.find().populate('mons')	
		res.send(khoi)
	},
	// add mon
	post: async(req, res)=>{
        let { ma, ten, mons } = req.body        
        // let ma = req.body.ma
        // let ten = right: 'number, string'eq.body.ten                
		const khoi = new Khoi({
            ma: ma,
            ten: ten,            
		})		
		try{
			khoi.save()
			.then(async (respone)=>{				
				
				mons.forEach(async item=>{
					// push khoi
					let p_khoi = await Khoi.findById(respone._id)
					p_khoi.mons.push(item.value)
					p_khoi.save()
					
					//push mon
					let p_mon = await Mon.findById(item.value)
					p_mon.khois.push(respone._id)
					p_mon.save()
				})				

				res.send({
					khoi: respone
				})
			})	
			.catch(()=>{
				res.json({
					result: "fail"
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
		let khoi = await Khoi.deleteOne({_id: id})
		.then(()=>{
			res.json({
				result: "delete sucessfully",
				_id: id
			})
		}).catch(err => res.json({
			error: err
		}))
		//res.send(user)
	}
}

module.exports = methods