const express = require('express')
const app = express()
const cors = require('cors')
const dbConnection = require('./db/db')
require('dotenv').config()
const userRoute = require('./router/userRoute')


dbConnection()
app.use(cors())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true}))
app.use('/api/users', userRoute)

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});



const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
