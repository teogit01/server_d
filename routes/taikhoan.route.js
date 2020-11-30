const express = require('express')
const router = express.Router()

import controllers from '../controllers/taikhoan.controller'

router.get('/', controllers.index)

// add nhom
router.post('/register', controllers.register)
router.post('/login', controllers.login)

// tao danh sach sinh vien import 
router.post('/create', controllers.createStudent)

// tai khoan cua nhom
router.get('/nhom/:_idnhom', controllers.taiKhoanCuaNhom)
// delete loai lop
//router.delete('/:id', controllers.destroy)



module.exports = router