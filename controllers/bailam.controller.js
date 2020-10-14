let Bailam = require('../models/bailam.model')
var shortid = require('shortid');

const methods = {
	index: async(req, res)=>{
		const bailam = await Bailam.find()
		res.send(bailam)
	},
	// add bailam
	post: async(req, res)=>{
        let { ma, ten, tongdiem} = req.body
        
        // let ma = req.body.ma
        // let ten = req.body.ten

		const bailam = new Bailam({
            ma: ma,
            ten: ten,
            tongdiem: tongdiem
		})
		try{
			const saveBailam = await bailam.save()
			res.json({
				result : "success" 
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