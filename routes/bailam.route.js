const express = require('express')
const router = express.Router()

import controllers from '../controllers/bailam.controller'

router.get('/', controllers.index)

// add bailam
router.post('/', controllers.post)
// delete bailam
router.delete('/:id', controllers.destroy)



module.exports = router