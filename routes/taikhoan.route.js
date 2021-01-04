const express = require('express')
const router = express.Router()

var multer  = require('multer')
var upload = multer({ dest: 'assets/image' })

import controllers from '../controllers/taikhoan.controller'

router.get('/', controllers.index)

// add nhom
router.post('/register', controllers.register)
router.post('/login', controllers.login)

router.post('/changepassword', controllers.doiMatKhau)

// tao danh sach sinh vien import 
router.post('/create', controllers.createStudent)
router.post('/capnhat-gv', controllers.capnhatGV)

router.get('/giao-vien', controllers.getGiaoVien)
router.post('/chi-tiet', controllers.chitiet)

// cap nhat tai khoan
router.post('/cap-nhat', controllers.capnhat)
router.post('/cap-mat-khau', controllers.capmatkhau)
// lich su thi cua  tai khoan
router.get('/lich-su-thi/:_idtaikhoan', controllers.lichsuthi)

//image
router.post('/upload-image', upload.single('image'), controllers.uploadImage)
router.post('/update-user', controllers.updateUser)

// tai khoan cua nhom
router.get('/nhom/:_idnhom', controllers.taiKhoanCuaNhom)
// delete loai lop
//router.delete('/:id', controllers.destroy)
router.get('/giao-vien', controllers.giaovien)
router.get('/sinh-vien', controllers.sinhvien)


module.exports = router