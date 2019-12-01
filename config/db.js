const mongoose = require('mongoose')


mongoose.connect(
    'mongodb://MyUser:passuser1pass@ds018839.mlab.com:18839/alextimofeev',
  { 
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    }
)

const connection = mongoose.connection

connection.on('error', function(){
    console.log('Connect error')
})

connection.once('open', async function(){
    console.log('MongoDB successfully connected')
})

module.exports = connection