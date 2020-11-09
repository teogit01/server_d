let Lop = require('../models/lop.model')
var shortid = require('shortid');

const methods = {
	index: async(req, res)=>{		
		const lop = await Lop.find()		
		res.send(lop)
	},
	// add mon
	post: async(req, res)=>{
        let { ma, ten } = req.body        
        // let ma = req.body.ma
        // let ten = req.body.ten        
		const lop = new Lop({
            ma: ma,
            ten: ten,            
		})		
		try{
			lop.save()
			.then((respone)=>{
				res.json({
					result : "success",
					lop: respone
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
		let lop = await Lop.deleteOne({_id: id}).then(()=>{
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