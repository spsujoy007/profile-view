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
          return res.send(result)
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
                  bio: userdata.bio,
                  github_link: userdata.github,
                  portfolio_link: userdata.portfolio,
                  hackerRank_link: userdata.hackerRank,
                  codeForce_link: userdata.codeForce,
                  drible_link: userdata.drible,
                  linkedin_link: userdata.linkedin,
                  facebook_link: userdata.facebook,
                  instagram_link: userdata.instagram,
                  twitter_link: userdata.twitter
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

      // app.post('/saveprofile', async(req, res) => {
      //     const userdata = req.body
      //     const query = req.query.username
      //     const filter = {username: query}
      //     const option = {upsert: true}

      //     const updatedDoc = {
      //       $set: {
      //         name: req.body.name,
      //         bio: req.body.bio,
      //         github_link: req.body.github,
      //         portfolio_link: req.body.portfolio,
      //         hackerRank_link: req.body.hackerRank,
      //         codeForce_link: req.body.codeForce,
      //         drible_link: req.body.drible,
      //         linkedin_link: req.body.linkedin,
      //         facebook_link: req.body.facebook,
      //         instagram_link: req.body.instagram,
      //         twitter_link: req.body.twitter
      //       }
      //     }
      //     const saveInfo = userProfileCollection.updateOne(filter, updatedDoc, option)

      //     res.send(saveInfo)
      // })

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