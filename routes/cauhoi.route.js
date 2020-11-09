const express = require('express')
const router = express.Router()

import controllers from '../controllers/cauhoi.controller'

router.get('/', controllers.index)

// cau hoi cua mon
router.get('/mon/:_idmon', controllers.questionOfSubject)
//detail 
router.get('/detail/:id', controllers.detail)

router.get('/dethi/:id', controllers.questionOfExam)

// add cau hoi
router.post('/', controllers.post)
// delete cau  hoi
router.delete('/:id', controllers.destroy)



module.exports = router