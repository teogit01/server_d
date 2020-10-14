const mongoose = require('mongoose');

const connect = mongoose.connect('mongodb://localhost/luanvan', {useNewUrlParser: true})
.then(()=>console.log("connect"))

module.exports = connect
