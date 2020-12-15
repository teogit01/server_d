const express = require('express')
const router = express.Router()

import controllers from '../controllers/baithi.controller'

router.get('/detail/:_idbaithi', controllers.detail)

router.post('/create', controllers.createBaiThi)

router.post('/nop-bai', controllers.nopbai)

router.post('/check', controllers.check)

module.exports = router

