const express = require('express')
const router = express.Router()

import controllers from '../controllers/cauhoi_phuongan.controller'

router.get('/', controllers.index)

// add cau hoi
router.post('/', controllers.post)
// delete cau  hoi
router.delete('/:id', controllers.destroy)



module.exports = router