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
      const userProfileCollection = client.db('profile-view').collection("userprofile");

      app.post('/signup', async (req, res) => {
        const userinfo = req.body
        const existUser = await usersCollection.findOne({username: userinfo.username})

        if(existUser?.username === userinfo.username){
          return res.status(400).json({error: 'Username already exits.', code: 20})
        }
        else{
          const result = await usersCollection.insertOne(userinfo)
          return res.send([result, userinfo])
        }
      })
      
      
      app.post('/saveprofile', async(req, res) => {
        const userdata = req.body
        const existUserInUsers = await usersCollection.findOne({username: userdata.username})
        if(existUserInUsers){
          const existUserInProfile = await userProfileCollection.findOne({username: userdata.username})
          if(existUserInProfile){
            const filter = {username: userdata.username}
            const option = {upsert: true}
            
            const updatedDoc = {
              $set: {
                name: userdata.name,
                bio: userdata.bio ? userdata.bio : null,
                profile_pic: userdata.profile_pic ? userdata.profile_pic : null,
                github_link: userdata.github_link ? userdata.github_link : null,
                portfolio_link: userdata.portfolio_link ? userdata.portfolio_link : null,
                hackerRank_link: userdata.hackerRank_link ? userdata.hackerRank_link : null,
                codeForce_link: userdata.codeForce_link ? userdata.codeForce_link : null,
                dribble_link: userdata.dribble_link ? userdata.dribble_link : null,
                linkedin_link: userdata.linkedin_link ? userdata.linkedin_link : null,
                facebook_link: userdata.facebook_link ? userdata.facebook_link : null,
                instagram_link: userdata.instagram_link ? userdata.instagram_link : null,
                twitter_link: userdata.twitter_link ? userdata.twitter_link : null
              }
            }
            const saveInfo = await userProfileCollection.updateOne(filter, updatedDoc, option)
            
            return res.send(saveInfo)
          }
          else{
            const saveInfo = await userProfileCollection.insertOne(userdata)
            return res.send(saveInfo)
          }
          
        }
        else {
          return res.status(400).json({error: 'Invalid user', code: 21})
        }
        
      })
      
      app.get('/userdata', async(req, res) => {
        const query = {username: req.query.username}
        const userdata = await userProfileCollection.findOne(query)
        res.send(userdata)
      })

      app.get('/userAccountInfo', async(req, res) => {
        const query = {
            username: req.query.username,
            password: req.query.pass
        }
        console.log(query)
        
        const userAccountInfo = await usersCollection.findOne(query)
        res.send(userAccountInfo)
      })
      
      app.get('/profile/:username', async(req, res) => {
        const query = {username: req.params.username}
          const userData = await userProfileCollection.findOne(query)
          res.send(userData)
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