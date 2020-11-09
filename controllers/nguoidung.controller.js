// let Nguoidung = require('../models/nguoidung.model')
// var shortid = require('shortid');

// const methods = {
// 	index: async(req, res)=>{
// 		const nguoidung = await Nguoidung.find()
// 		res.send(nguoidung)
// 	},
// 	// add user 
// 	post: async(req, res)=>{
// 		let { tendangnhap, matkhau, hoten, gmail, sodienthoai, anh, diachi } = req.body

// 		const nguoidung = new Nguoidung({
// 			tendangnhap,
// 			matkhau,
// 			hoten,
// 			code: shortid.generate(),
// 			gmail: '',
// 			sodienthoai: '',
// 			anh: '',
// 			diachi: '',
// 			point: 0,
// 			id_role : "5f56eb558dac8855fbb7d19e"
// 		})
// 		try{
// 			const saveNguoidung = await nguoidung.save()
// 			res.json({
// 				result : "success" 
// 			})
// 		} catch(err){
// 			res.json({
// 				error : error 
// 			})
// 		}
// 	},
// 	// delete user (id)
// 	destroy: async(req, res)=>{
// 		let id = req.params.id
// 		//let user = await User.findById(id)
// 		let nguoidung = await Nguoidung.deleteOne({_id: id}).then(()=>{
// 			res.json({
// 				result: "delete sucessfully"
// 			})
// 		}).catch(err => res.json({
// 			error: err
// 		}))
// 		//res.send(user)
// 	}
// }

// module.exports = methods