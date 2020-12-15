let Mon = require('../models/mon.model')
let CauHoi = require('../models/cauhoi.model')
let DeThi = require('../models/dethi.model')
var shortid = require('shortid');

const methods = {
	index: async(req, res)=>{		
		const mon = await Mon.find().populate('cauhois')
		res.send(mon)
	},
	// add mon
	post: async (req, res)=>{        
		try{	
			let { ma, ten } = req.body        	        
			const mon = new Mon({
	            ma: ma,
	            ten: ten,                             
			})		
			mon.save().then(respone =>{
				res.send(respone)
			})			
		} catch(err){
			res.send(err)
		}

	},	
	// delete loaicauhoi (id)
	remove: async (req, res)=>{
		try{
			const {_idmon} = req.params			
			const mon = await Mon.findById(_idmon)
				mon.delete()				
			//delete all cau hoi cua mon
			const cauhoi = await CauHoi.deleteMany({'mon':_idmon})
			// delete mon trong de thi
			const dethi = await DeThi.deleteMany({'mon':_idmon})			
			res.end()
		} catch(err){
			res.send(err)
		}
	}
}

module.exports = methods