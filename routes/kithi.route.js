const express = require('express')
const router = express.Router()

import controllers from '../controllers/kithi.controller'

router.get('/', controllers.index)

router.get('/detail/:id', controllers.detail)

// add ki thi
router.post('/', controllers.post)
// delete cau  hoi
router.delete('/:id', controllers.destroy)



module.exports = router