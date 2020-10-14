let Loaicauhoi = require('../models/loaicauhoi.model')
var shortid = require('shortid');

const methods = {
	index: async(req, res)=>{
		const loaicauhoi = await Loaicauhoi.find()
		res.send(loaicauhoi)
	},
	// add loai cau hoi 
	post: async(req, res)=>{
        let { ma, ten, noidung } = req.body
        
        // let ma = req.body.ma
        // let ten = req.body.ten

		const loaicauhoi = new Loaicauhoi({
            ma: ma,
            ten: ten,
            noidung: noidung
		})
		try{
			const saveLoaicauhoi = await loaicauhoi.save()
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
		let loaicauhoi = await Loaicauhoi.deleteOne({_id: id}).then(()=>{
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