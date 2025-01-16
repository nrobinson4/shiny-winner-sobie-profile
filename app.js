/**
 * Declarations
 */
const express = require('express')
const app = express()

/**
 * endpoint, middleware(s)
 * " app get to slash "
 */
 
app.get('/', function (req, res) {
  res.send('Hello Express')
})

app.listen(3000)