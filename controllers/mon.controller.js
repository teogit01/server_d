let Mon = require('../models/mon.model')
let Khoi = require('../models/khoi.model')
let Khoi_Mon = require('../models/khoi_mon.model')
var shortid = require('shortid');

const methods = {
	index: async(req, res)=>{		
		const mon = await Mon.find().populate('cauhois')
		res.send(mon)
	},
	// add mon
	post: async(req, res)=>{
        let { ma, ten } = req.body        
        // let ma = req.body.ma
        // let ten = req.body.ten        
		const mon = new Mon({
            ma: ma,
            ten: ten,                             
		})		
		try{
			mon.save()
			.then( async (respone)=>{

				// let p_khoi = await Khoi.findById(khoi)
				// 	p_khoi.mons.push(respone._id)
				// 	p_khoi.save()
				
				// let p_mon = await Mon.findById(respone._id)
				// 	p_mon.khois.push(khoi)
				// 	p_mon.save().then(()=>{
				// 		res.json({
				// 			result : "success",
				// 			data: p_mon
				// 		})
				// 	})
				res.json({
					result : "success",
					mon: respone
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
		try{			
			let _idsubject = req.params.id		
			let subject = await Mon.findById(_idsubject)
			let khoi = await Mon.findById(_idsubject).populate('khois')
						
			let newMons = [] 
			khoi.khois[0].mons.forEach(_idmon=>{
				if (_idmon != _idsubject)
					newMons.push(_idmon)
			})
			res.send(newMons)
			//console.log(subject.khois[0].mons)			
			res.send(khoi.khois[0].mons)
		} catch(err){
			res.send(err)		
		}
		
		// res.send(subject.khois)
		// //let khoi = await khoi.findById()
		// let mon = await Mon.deleteOne({_id: id}).then(()=>{
		// 	res.json({
		// 		result: "delete sucessfully"
		// 	})
		// }).catch(err => res.json({
		// 	error: err
		// }))
		//res.send(user)
	}
}

module.exports = methods