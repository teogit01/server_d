
const express = require('express')
const rootRouter = express.Router()
//----------------------------------------------------------

//const nguoidung = require('./nguoidung.route')
const cauhoi = require('./cauhoi.route')
const phuongan = require('./phuongan.route')
const mon = require('./mon.route')
const dethi = require('./dethi.route')
const kithi = require('./kithi.route')
const nhom = require('./nhom.route')
const taikhoan = require('./taikhoan.route')
const thongbao = require('./thongbao.route')
const baithi = require('./baithi.route')
const cauhoibaithi = require('./cauhoibaithi.route')
const phuonganbaithi = require('./phuonganbaithi.route')
//----------------------------------------------------------

//rootRouter.use('/api/nguoidung', nguoidung)
rootRouter.use('/api/cau-hoi', cauhoi)
rootRouter.use('/api/phuongan', phuongan)
rootRouter.use('/api/mon', mon)
rootRouter.use('/api/de-thi', dethi)
rootRouter.use('/api/ki-thi', kithi)
rootRouter.use('/api/nhom', nhom)
rootRouter.use('/api/tai-khoan', taikhoan)
rootRouter.use('/api/thong-bao', thongbao)
rootRouter.use('/api/bai-thi', baithi)
rootRouter.use('/api/cau-hoi-bai-thi', cauhoibaithi)
rootRouter.use('/api/phuong-an-bai-thi', phuonganbaithi)

//----------------------------------------------------------
module.exports = rootRouter

