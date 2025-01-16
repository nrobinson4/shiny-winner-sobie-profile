/**
 * Declarations
 */
const express = require('express')
const app = express()
const port = process.env.PORT || 3000;


/**
 * endpoint, middleware(s)
 * " app get to slash "
 */
 
app.get('/', function (req, res) {
  res.send('Hello Express')
})
            // IIFE immediately invoked function expression
app.listen(port, ()=> console.log(`server is running on ... ${port}`))