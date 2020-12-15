let TaiKhoan = require('../models/taikhoan.model')
let Nhom = require('../models/nhom.model')
const bcrypt = require('bcrypt');

var shortid = require('shortid');
const saltRounds = 1;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

const methods = {
	index: async(req, res)=>{
		const taikhoan = await TaiKhoan.find()
		res.send(taikhoan)
	},
	register : async (req, res) => {
		try{					
			const {username, password} = req.body			
			// bcrypt.genSalt(saltRounds, function(err, salt) {
			//     bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
			//         console.log(hash)
			//     });
			// });			
			let hash_pass = ''			
			bcrypt.hash(password, saltRounds).then(hash=>{
				//console.log(hash)				
				
				let taikhoan = new TaiKhoan({
					maso:username,
					matkhau:hash,
					vaitro:1
				})						
				taikhoan.save()
			})
			
			res.send('ok')		
			// const taikhoan = await new TaiKhoan({
					
			// })
					
		} catch (err){
			res.send(err)
		}
	},
	login : async (req, res)=>{
		try{
			const {username, password} = req.body
			const user = await TaiKhoan.find({maso:username})
			if (user != ''){				
				let check = false	
				bcrypt.compare(password, user[0].matkhau).then(function(result) {
    				check = result
    				if(check===true){
    					return res.send({checked:true,user:user})
    				} else {
    					return res.send({checked:false,mess:'Wrong Password'})
    				}
				});								
			} else {				
				return res.send({checked:false, mess:'Not exit'})
			}
		} catch(err){
			res.send(err)
		}
	},
	createStudent : async (req, res)=>{
		try{
			const { students, nhomActived } = req.body

			if(students){
				students.forEach(async (student, idx)=>{
					const matkhautam = shortid.generate()
					const sv = await TaiKhoan.find({maso:student.MSSV})
					if (sv.length!=0){
						sv.forEach(async item=>{
							item.nhoms.push(nhomActived._id)
							item.save().then(async response=>{
								let nhom = await Nhom.findById(nhomActived._id)
									nhom.sinhviens.push(item._id)
									nhom.save()
							})
						})
						//sv[0].nhoms.push(nhomActived._id)						
					} else {
						bcrypt.hash(matkhautam, saltRounds).then(async hash=>{
							//console.log(hash)				
						
							let taikhoan = await new TaiKhoan({
								maso:student.MSSV,
								ten:student['Họ tên'],
								gioitinh:student['Giới tính'],
								email:student.Email,
								matkhau:hash,
								nhoms:nhomActived._id,
								matkhautam:matkhautam,
								vaitro:2
							})								
							taikhoan.save().then(async respone=>{
								let nhom = await Nhom.findById(nhomActived._id)
									nhom.sinhviens.push(respone)
									nhom.save()
							})
						})				
					}					

					if (idx === students.length-1){
						//const students_result = await Nhom.findById(nhomActived._id).populate('sinhviens')
						res.send('ok')
					}
				})
			}
		} catch(err){
			res.send(err)
		}
	},
	taiKhoanCuaNhom : async (req, res)=>{
		try{
			const { _idnhom } = req.params
			const nhom = await Nhom.findById(_idnhom).populate('sinhviens').sort({'maso':-1})			
			// const nhom = await Nhom.findById(_idnhom).populate({
			// 	path:'sinhviens',
			// 	model:'TaiKhoan',
			// 	sort: {'maso':-1}
			// })
			res.send(nhom)
		} catch(err){
			res.send(err)
		}
	}
}

module.exports = methods