const express = require('express')
const router = express.Router()

import controllers from '../controllers/nhom.controller'

router.get('/', controllers.index)

router.get('/giao-vien/:_idtaikhoan', controllers.giaovien)
router.get('/sinh-vien/:_idtaikhoan', controllers.sinhvien)
// add nhom
router.post('/add', controllers.post)
router.get('/detail/:_idnhom', controllers.detail)
// delete loai lop
//router.delete('/:id', controllers.destroy)
router.get('/remove/:_idnhom', controllers.remove)



module.exports = router