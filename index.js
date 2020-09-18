require('dotenv').config();

const express = require('express')
const bodyParser = require('body-parser')

//connect db
const connect_db = require('./db')

// import Route ------------------------------------------------------------------------
const rootRouter = require('./routes/index.route')

const app = express()
// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const port = process.env.PORT

// congifg ------------------------------------------------------------------------------
app.set('view engine', 'pug')
//app.set('views', './views')

// Route --------------------------------------------------------------------------------
app.use('/', rootRouter)

app.listen(port,()=>{
	console.log('Start server port = ', port)
})