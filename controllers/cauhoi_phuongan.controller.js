let Cauhoi_phuongan = require('../models/cauhoi_phuongan.model')
var shortid = require('shortid');

const methods = {
	index: async(req, res)=>{
		const cauhoi_phuongan = await Cauhoi_phuongan.find()
		res.send(cauhoi_phuongan)
	},
	// add loai cau hoi 
	post: async(req, res)=>{
        let { ma_cauhoi, ma_phuongan} = req.body
        
        // let ma = req.body.ma
        // let ten = req.body.ten

		const cauhoi_phuongan = new Cauhoi_phuongan ({
            ma_cauhoi: ma_cauhoi,
            ma_phuongan: ma_phuongan
		})
		try{
			const saveCauhoi_phuongan = await cauhoi_phuongan.save()
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
		let cauhoi_phuongan = await Cauhoi_phuongan.deleteOne({_id: id}).then(()=>{
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