const express = require('express')
const router = express.Router()

import controllers from '../controllers/dethi.controller'

router.get('/', controllers.index)

router.get('/detail/:id', controllers.detail)

// de thi cua mon
router.get('/mon/:_idmon',controllers.testOfSubject)
// edit // add question to exam
// router.post('/add-question/:id', controllers.addQuestion)
router.post('/add-question', controllers.addQuestion)
//delete
router.post('/remove-question', controllers.removeQuestion)
// add cau hoi
router.post('/', controllers.post)
// delete cau  hoi
router.delete('/:id', controllers.destroy)



module.exports = router