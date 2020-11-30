const express = require('express')
const router = express.Router()

import controllers from '../controllers/thongbao.controller'

router.get('/', controllers.index)

router.get('/nhom/:_idnhom', controllers.thongBaoCuaNhom)

router.post('/them',controllers.post)


module.exports = router