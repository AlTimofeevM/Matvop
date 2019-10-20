const express = require('express')
const path = require('path')

const frontendPath = path.join(__dirname, '../frontend')
const port = 8080

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended : false}))
app.use(express.static(path.join(frontendPath, '/public')))

const pagesRoutes = require('./routes/pages.js')

app.use('/', pagesRoutes)

app.listen(port, () => console.log('Example app listening on port ' + port))