/**
 * Declarations
 */
const express = require('express')
const app = express()
const port = process.env.PORT || 3000;

/** uses index.html in the public directory */
app.use(express.static(__dirname + "/public"))

/** where the actual web thingy gets pointed from codepen example
 * put /helloRender in index to access that endpoint
 */
app.get('/', function (req, res) {
  res.sendFile('index.html')
})

/** see how to fix 
app.get('/nodemon', function (req, res) {
  res.sendFile('AHHHHHHHHHHHHHHH')
})
*/
/**
 * endpoint, middleware(s)
 * " app get to slash "
 * has link to index.html
 */
app.get('/helloRender', function (req, res) {
  res.send('Hello Express from real world<br><a href="/"> back to home</a>')
})


// IIFE immediately invoked function expression
app.listen(port, ()=> console.log(`server is running on ... ${port}`))

