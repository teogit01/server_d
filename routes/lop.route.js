const express = require('express')
const router = express.Router()

import controllers from '../controllers/lop.controller'

router.get('/', controllers.index)

// add loai lop
router.post('/', controllers.post)
// delete loai lop
router.delete('/:id', controllers.destroy)



module.exports = router