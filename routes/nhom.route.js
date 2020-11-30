const express = require('express')
const router = express.Router()

import controllers from '../controllers/nhom.controller'

router.get('/', controllers.index)

// add nhom
router.post('/add', controllers.post)
// delete loai lop
//router.delete('/:id', controllers.destroy)
router.get('/remove/:_idnhom', controllers.remove)



module.exports = router