/**
 * Declarations
 */
const express = require('express')
require('dotenv').config()
const app = express()
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser')
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGO_URI;

// console.log(uri)

/** uses index.html in the public directory */
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(__dirname + "/public"))

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
// run().catch(console.dir);

// Promise architecture
async function getData() {
  await client.connect();
  let shinyCollection = await client.db("shiny-database").collection("shiny-details");
  let results = await shinyCollection.find({}).toArray();
    
  console.log(results);
  return results;
}

// BEGIN MIDDLEWARE

/** where the actual web thingy gets pointed from codepen example
 * put /helloRender in index to access that endpoint
 */
// MUST BE ASYNC for await function
app.post('/insert', async (req, res) => {
  console.log('in /insert')
  await client.connect()
  await client.db("shiny-database").collection("shiny-details").insertOne({ name : req.body.newName })
  res.redirect('/ejs')
})

app.get('/read', async function (req, res) {
  let getDataResults = await getData(); 
  res.render('names', 
  { nameData : getDataResults })
})

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
  
  console.log('req.query: ', req.query)
  let queryName = req.query.myName
  
  // console.log('req.params: ', req.params)
  
  res.render('words',
    {pageTitle: queryName}
  )
})

app.post('/saveMyNamePost', (req, res) => {
  console.log('did we hit the post endpoint')
  
  console.log(req.body)
  let bodyName = req.body.myName
  // res.redirect('/ejs')
  res.render('words', 
    {pageTitle: bodyName}
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

