const mongoose = require('mongoose')

mongoose.connect(
    'mongodb://MyUser:passuser1pass@ds024778.mlab.com:24778/alextimofeev',
  { useNewUrlParser: true }
)

const connection = mongoose.connection

connection.on('error', function(){
    console.log('Connect error')
})

connection.once('open', async function(){
    console.log('MongoDB successfully connected')
})

module.exports = connection