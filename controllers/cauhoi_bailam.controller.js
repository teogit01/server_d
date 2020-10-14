let Cauhoi_bailam = require('../models/cauhoi_bailam.model')
var shortid = require('shortid');

const methods = {
	index: async(req, res)=>{
		const cauhoi_bailam = await Cauhoi_bailam.find()
		res.send(cauhoi_bailam)
	},
	// add loai cau hoi 
	post: async(req, res)=>{
        let { ma_cauhoi, ma_bailam} = req.body
        
        // let ma = req.body.ma
        // let ten = req.body.ten

		const cauhoi_bailam = new Cauhoi_bailam ({
            ma_cauhoi: ma_cauhoi,
            ma_bailam: ma_bailam
		})
		try{
			const saveCauhoi_bailam = await cauhoi_bailam.save()
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
		let cauhoi_bailam = await Cauhoi_bailam.deleteOne({_id: id}).then(()=>{
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