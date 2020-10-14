let Phieudangki = require('../models/phieudangki.model')
var shortid = require('shortid');

const methods = {
	index: async(req, res)=>{
		const phieudangki = await Phieudangki.find()
		res.send(phieudangki)
	},
	// add loai cau hoi 
	post: async(req, res)=>{
        let { ma, ten, ma_bailamm, username_user } = req.body
        
        // let ma = req.body.ma
        // let ten = req.body.ten

		const phieudangki = new Phieudangki({
            ma: ma,
            ten: ten,
            ma_bailamm: ma_bailamm,
            username_user: username_user
		})
		try{
			const savePhieudangki = await phieudangki.save()
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
		let phieudangki = await Phieudangki.deleteOne({_id: id}).then(()=>{
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