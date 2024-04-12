const express = require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000

const cors = require('cors');
require('dotenv').config();

// middleware 
app.use(express.json())
app.use(cors())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.6ke0m0t.mongodb.net/?retryWrites=true&w=majority`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


async function run(){
    try{
      const usersCollection = client.db('profile-view').collection("usersinfo");

      app.post('/signup', async (req, res) => {
        const userinfo = req.body
        const existUser = await usersCollection.findOne({username: userinfo.username})

        if(existUser?.username === userinfo.username){
          return res.status(400).json({error: 'Username already exits.', code: 20})
        }
        else{
          const result = await usersCollection.insertOne(userinfo)
          return res.send(result)
        }
      })

    }

    finally{}
}
run().catch(error => console.error(error))



app.get('/', (req, res) => {
  res.send(`
    <h1>Profile view</h1>
  `)
})

app.listen(port, () => {
  console.log(`social-lab server listening on port ${port}`)
})