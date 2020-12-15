const express = require('express')
const router = express.Router()

import controllers from '../controllers/phuonganbaithi.controller'

router.get('/', controllers.index)

// cau hoi cua mon

module.exports = router