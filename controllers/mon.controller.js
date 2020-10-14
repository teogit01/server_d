let Mon = require('../models/mon.model')
var shortid = require('shortid');

const methods = {
	index: async(req, res)=>{
		const mon = await Mon.find()
		res.send(mon)
	},
	// add loai cau hoi 
	post: async(req, res)=>{
        let { ma, ten, phieudangki_ma } = req.body
        
        // let ma = req.body.ma
        // let ten = req.body.ten

		const mon = new Mon({
            ma: ma,
            ten: ten,
            phieudangki_ma: phieudangki_ma
		})
		try{
			const saveMon = await mon.save()
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
		let mon = await Mon.deleteOne({_id: id}).then(()=>{
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