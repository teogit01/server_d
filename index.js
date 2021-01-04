require('dotenv').config();

const nodemailer = require('nodemailer')

const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')

//connect db
const connect_db = require('./db')
var path = require('path')

// import Route ------------------------------------------------------------------------
const rootRouter = require('./routes/index.route')

const app = express()
app.use(cors())
// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const port = process.env.PORT

// congifg ------------------------------------------------------------------------------
app.set('view engine', 'pug')
//app.set('views', './views')

// Route --------------------------------------------------------------------------------
app.use('/', rootRouter)

app.get('/api/image/:name',function(req, res){
	let fileName = req.params.name
	res.sendFile(path.resolve(`./assets/image/${fileName}`));
})

app.listen(port,()=>{
	console.log('Start server port = ', port)
})