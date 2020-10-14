const express = require('express')
const router = express.Router()

import controllers from '../controllers/phuongan.controller'

router.get('/', controllers.index)

// add loai cau hoi
router.post('/', controllers.post)
// delete loai cau  hoi
router.delete('/:id', controllers.destroy)



module.exports = router