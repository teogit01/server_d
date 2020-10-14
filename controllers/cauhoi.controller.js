let Cauhoi = require('../models/cauhoi.model')
var shortid = require('shortid');

const methods = {
	index: async(req, res)=>{
		const cauhoi = await Cauhoi.find()
		res.send(cauhoi)
	},
	// add cau hoi 
	post: async(req, res)=>{
        let { ma, ten, noidung, ma_loai } = req.body
        
        // let ma = req.body.ma
        // let ten = req.body.ten

		const cauhoi = new Cauhoi({
            ma: ma,
            ten: ten,
            noidung: noidung,
            ma_loai: ma_loai
		})
		try{
			const saveCauhoi = await cauhoi.save()
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
		let cauhoi = await Cauhoi.deleteOne({_id: id}).then(()=>{
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