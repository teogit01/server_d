const express = require('express')
const router = express.Router()

import controllers from '../controllers/cauhoi.controller'

router.get('/', controllers.index)

// cau hoi cua mon
router.get('/mon/:_idmon', controllers.questionOfSubject)
//detail 
router.get('/detail/:id', controllers.detail)

router.get('/de-thi/:_iddethi', controllers.cauhoiCuaDethi)

// {noi dung, phuongans[]}
router.post('/them', controllers.themCauHoi)
router.post('/mon', controllers.cauHoiCuaMon)
router.post('/them-nhieu', controllers.themCauHoiNhieu)
// delete cau  hoi
router.delete('/:id', controllers.destroy)

router.post('/remove', controllers.removeCauHoi)

// import cau hoi
router.post('/import', controllers.import)



module.exports = router