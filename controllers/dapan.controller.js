let Dapan = require('../models/dapan.model')
var shortid = require('shortid');

const methods = {
	index: async(req, res)=>{
		const dapan = await Dapan.find()
		res.send(dapan)
	},
	// add cau hoi 
	post: async(req, res)=>{
        let { ma, ten, noidung, ma_cauhoi } = req.body
        
        // let ma = req.body.ma
        // let ten = req.body.ten

		const dapan = new Dapan({
            ma: ma,
            ten: ten,
            noidung: noidung,
            ma_cauhoi: ma_cauhoi
		})
		try{
			const saveDapan = await dapan.save()
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
		let dapan = await Dapan.deleteOne({_id: id}).then(()=>{
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