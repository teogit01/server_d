const mongoose = require('mongoose');

const connect = mongoose.connect('mongodb://localhost/luanvan_d', {useNewUrlParser: true})
.then(()=>console.log("connect"))

module.exports = connect
