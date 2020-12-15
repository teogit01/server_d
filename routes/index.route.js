
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
const lop = require('./lop.route')
const khoi = require('./khoi.route')
const dethi = require('./dethi.route')
const kithi = require('./kithi.route')
const nhom = require('./nhom.route')
const taikhoan = require('./taikhoan.route')
const thongbao = require('./thongbao.route')
//----------------------------------------------------------

//rootRouter.use('/api/nguoidung', nguoidung)
rootRouter.use('/api/cau-hoi', cauhoi)
rootRouter.use('/api/loaicauhoi', loaicauhoi)
rootRouter.use('/api/bailam', bailam)
rootRouter.use('/api/cauhoi_bailam', cauhoi_bailam)
rootRouter.use('/api/phuongan', phuongan)
rootRouter.use('/api/dapan', dapan)
rootRouter.use('/api/cauhoi_phuongan', cauhoi_phuongan)
rootRouter.use('/api/phieudangki', phieudangki)
rootRouter.use('/api/mon', mon)
rootRouter.use('/api/lop', lop)
rootRouter.use('/api/khoi', khoi)
rootRouter.use('/api/de-thi', dethi)
rootRouter.use('/api/ki-thi', kithi)
rootRouter.use('/api/nhom', nhom)
rootRouter.use('/api/tai-khoan', taikhoan)
rootRouter.use('/api/thong-bao', thongbao)

//----------------------------------------------------------
module.exports = rootRouter

