const express = require('express')
const router = express.Router()

import controllers from '../controllers/mon.controller'

router.get('/', controllers.index)

// add loai cau hoi
router.post('/add', controllers.add)
router.post('/chi-tiet', controllers.chitiet)
router.post('/giao-vien', controllers.mongiaovien)
// delete loai cau  hoi
router.get('/remove/:_idmon', controllers.remove)



module.exports = router