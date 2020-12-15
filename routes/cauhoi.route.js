const express = require('express')
const router = express.Router()

import controllers from '../controllers/cauhoi.controller'

router.get('/', controllers.index)

// cau hoi cua mon
router.get('/mon/:_idmon', controllers.questionOfSubject)
//detail 
router.get('/detail/:id', controllers.detail)

router.get('/de-thi/:id', controllers.questionOfExam)

// add cau hoi
router.post('/', controllers.post)
// {noi dung, phuongans[]}
router.post('/them', controllers.addQuestion)
// delete cau  hoi
router.delete('/:id', controllers.destroy)
router.post('/remove', controllers.removeCauHoi)



module.exports = router