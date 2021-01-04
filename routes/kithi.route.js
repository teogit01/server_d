const express = require('express')
const router = express.Router()

import controllers from '../controllers/kithi.controller'

router.get('/', controllers.index)

router.get('/detail/:_idkithi', controllers.detail)

router.get('/trang-thai/:_idkithi', controllers.updateStatus)

router.get('/sinh-vien/:_idsv', controllers.kithiCuaSV)

router.post('/load-de/', controllers.loadDeCuaKiThi)
router.post('/giao-vien/', controllers.kithiCuaGV)

// add ki thi
router.post('/them', controllers.post)
// delete cau  hoi
router.delete('/remove/:_idkithi', controllers.destroy)

// them de thi cho ki thi
router.post('/them-de', controllers.themDeThi)
// tahy doi de dong mo
router.post('/de-dong-mo', controllers.changeDongMo)

// set tinh trang
router.post('/tinh-trang', controllers.tinhtrang)
// tim kiem post {value}
router.post('/tim-kiem', controllers.search)

// doi mat khau ki thi
router.post('/doi-mat-khau', controllers.DoiMatKhau)

// them nhom thi cho ki thi
router.post('/them-nhom', controllers.themNhom)

router.post('/remove-de-thi', controllers.removeDethi)
router.post('/remove-nhom', controllers.removeNhom)

module.exports = router