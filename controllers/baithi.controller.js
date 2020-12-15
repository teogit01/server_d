let BaiThi = require('../models/baithi.model')
let CauHoi = require('../models/cauhoi.model')
let PhuongAn = require('../models/phuongan.model')
let TaiKhoan = require('../models/taikhoan.model')
var shortid = require('shortid');

const methods = {
	// index: async (req, res)=>{
	// 	const cauhoi = await CauHoi.find().populate('mon')
	// 	res.send(cauhoi)
	// },
	check : async (req, res)=>{
		try{
			const {dethi, kithi, sinhvien} = req.body						
			const baithi_check = await BaiThi.find({'kithi._id':kithi._id,'dethi._id':dethi._id,'sinhvien':sinhvien})
			if (baithi_check.length<=0){
				res.send({result:false})
			} else {				
				res.send({result:true})
			}			
		} catch(err){
			res.send(err)
		}
	},
	createBaiThi : async (req, res)=>{		
		try{
			const {dethi, kithi, thoigian, tgbd, tgkt, sinhvien, ngay} = req.body
							
			const baithi = await new BaiThi({
				ma:shortid.generate(),
				kithi: {'_id':kithi._id,'tieude':kithi.tieude},
				dethi: {'_id':dethi._id,'tieude':dethi.tieude},
				thoigian: thoigian,
				tgbd: tgbd,
				tgkt: tgkt,
				sinhvien: sinhvien,
				ngay:ngay							
			})

			//res.send({result_baithi:true})
			const result_baithi = await baithi.save()

			const taikhoan = await TaiKhoan.findById(sinhvien)
				taikhoan.baithis.push(result_baithi._id)
				taikhoan.save()
			if (dethi.cauhois.length > 0){				
				let count = 0
				dethi.cauhois.forEach(async ch=>{					
					//count++
					const cauhoi = await CauHoi.findById(ch)
						cauhoi.baithis.push(result_baithi._id)						
						if (cauhoi){
							cauhoi.save()
							count++
							result_baithi.cauhois.push(ch)					

							// save id cau hoi  ->  bailam cauhois												
							if (count === dethi.cauhois.length ){
								result_baithi.save(	)
								res.send({result_baithi:result_baithi})
							}
						}											
				})
				//result_baithi.save()
				//res.send({result_baithi:result_baithi})
				}					
			
			
		} catch(err){
			res.send(err)
		}
	},

	detail : async (req, res)=>{
		try{
			const {_idbaithi} = req.params
			const baithi = await BaiThi.findById(_idbaithi).populate({
				path : 'cauhois',
				model: 'CauHoi',
				populate : {
					path : 'phuongans',
					model : 'PhuongAn'
				}
			})
			res.send(baithi)
		} catch(err){
			res.send(err)
		}
	},
	nopbai : async (req, res)=>{
		try{
			const {_idbaithi, tgnb, dung, phuongans} = req.body
			// phuongans => phuongan // {cauhoi:_idcauhoi, phuongan:{....}}
			const baithi = await BaiThi.findById(_idbaithi)
				phuongans.forEach(phuongan=>{
					baithi.phuongans.push(phuongan.phuongan._id)
				})
				baithi.tgnb = tgnb
				baithi.dung = dung
				baithi.sai = baithi.cauhois.length - dung				
				baithi.diem = (10/baithi.cauhois.length)*dung
				baithi.save()


		} catch(err){
			res.send(err)
		}
	}
}

module.exports = methods
