const express = require('express')
const router = express.Router()

import controllers from '../controllers/sendmail.controller'

router.post('/', controllers.sendmail)



module.exports = router