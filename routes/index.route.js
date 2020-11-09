
const express = require('express')
const rootRouter = express.Router()
//----------------------------------------------------------

//const nguoidung = require('./nguoidung.route')
const cauhoi = require('./cauhoi.route')
const loaicauhoi = require('./loaicauhoi.route')
const bailam = require('./bailam.route')
const cauhoi_bailam = require('./cauhoi_bailam.route')
const phuongan = require('./phuongan.route')
const dapan = require('./dapan.route')
const cauhoi_phuongan = require('./cauhoi_phuongan.route')
const phieudangki = require('./phieudangki.route')
const mon = require('./mon.route')
//----------------------------------------------------------

//rootRouter.use('/api/nguoidung', nguoidung)
rootRouter.use('/api/cauhoi', cauhoi)
rootRouter.use('/api/loaicauhoi', loaicauhoi)
rootRouter.use('/api/bailam', bailam)
rootRouter.use('/api/cauhoi_bailam', cauhoi_bailam)
rootRouter.use('/api/phuongan', phuongan)
rootRouter.use('/api/dapan', dapan)
rootRouter.use('/api/cauhoi_phuongan', cauhoi_phuongan)
rootRouter.use('/api/phieudangki', phieudangki)
rootRouter.use('/api/mon', mon)

//----------------------------------------------------------
module.exports = rootRouter

