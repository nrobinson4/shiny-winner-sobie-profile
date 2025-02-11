/**
 * Declarations
 */
const express = require('express')
require('dotenv').config()
const app = express()
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = process.env.MONGO_URI;


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

const mongoCollection = client.db("nolenSobieProfile").collection("nolenSobieBlog")


function initProfileData() {
  mongoCollection.insertOne({
    title: "this is the blog post",
    post: "this is the post"
  })
}

initProfileData()
// Promise architecture

// BEGIN MIDDLEWARE

/** where the actual web thingy gets pointed from codepen example
 * put /helloRender in index to access that endpoint
 */
// MUST BE ASYNC for await function
app.post('/insert', async (req, res) => {
  
  let results = await mongoCollection.insertOne({ 
    title : req.body.title,
    post : req.body.post 
  })
  res.redirect('/')
})

app.post('/delete', async function (req, res) {
  let result = await mongoCollection.findOneAndDelete( 
  {
    "_id": new ObjectId(req.body.deleteId)
  }).then(result => {
    res.redirect('/');
  })
}); 

app.post('/update', async (req,res)=>{
  let result = await mongoCollection.findOneAndUpdate( 
  {_id: ObjectId.createFromHexString(req.body.updateId)}, { 
    $set: 
      {
        title : req.body.updateTitle, 
        post : req.body.updatePost 
      }
    }
  ).then(result => {
  console.log(result); 
  res.redirect('/');
  })
}); 

app.get('/', async function (req, res) {

  let results = await mongoCollection.find({}).toArray()

  results.length === 0 ? initProfileData() : console.log("results was populated already") 
  res.render('profile',
    { profileData : results }
  )
  
})

/**
 * endpoint, middleware(s)
 * " app get to slash "
 * has link to index.html
 */
// IIFE immediately invoked function expression
app.listen(port, ()=> console.log(`server is running on ... ${port}`))

