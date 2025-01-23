/**
 * Declarations
 */
const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser')

/** uses index.html in the public directory */
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(__dirname + "/public"))

/** where the actual web thingy gets pointed from codepen example
 * put /helloRender in index to access that endpoint
 */
app.get('/', function (req, res) {
  res.sendFile('index.html')
})

app.get('/ejs', function (req, res) {
  res.render('words', 
    {pageTitle: 'my cool ejs page'}
  );
})

app.get('/saveMyNameGet', (req, res) => {
  console.log('did we hit the get endpoint')
  
  console.log(req.query)
  
  res.redirect('/ejs')
})

app.post('/saveMyNamePost', (req, res) => {
  console.log('did we hit the post endpoint')
  
  console.log(req.body)
  
  // res.redirect('/ejs')
  res.render('words', 
    {pageTitle: req.body.myName}
  );
})


app.get('/nodemon', function (req, res) {
  res.send('AHHHHHHHHHHHHHHH')
})

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

