let Phuongan = require('../models/phuongan.model')
var shortid = require('shortid');

const methods = {
	index: async(req, res)=>{
		const phuongan = await Phuongan.find()
		res.send(phuongan)
	},
	// add cau hoi 
	post: async(req, res)=>{
        let { ma, ten, noidung} = req.body
        
        // let ma = req.body.ma
        // let ten = req.body.ten

		const phuongan = new Phuongan({
            ma: ma,
            ten: ten,
            noidung: noidung
        
		})
		try{
			const savePhuongan = await phuongan.save()
			res.json({
				result : "success" 
			})
		} catch(err){
			res.json({
				error : error 
			})
		}
	},
	// delete cauhoi (id)
	destroy: async(req, res)=>{
		let id = req.params.id
		//let user = await User.findById(id)
		let phuongan = await Phuongan.deleteOne({_id: id}).then(()=>{
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