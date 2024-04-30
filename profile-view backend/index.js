const express = require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000 
//https://profile-view-be.vercel.app/

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
      const visitedProfilesCollect =  client.db('profile-view').collection("visited_profile");
      const likedProfileCollect =  client.db('profile-view').collection("liked_profiles");

      app.post('/signup', async (req, res) => {
        const userinfo = req.body;
        const existUser = await usersCollection.findOne({ username: userinfo.username });
    
        if (existUser?.username === userinfo.username) {
            return res.status(400).json({ error: 'Username already exists.', code: 20 });
        } else {
            try {
                const result = await usersCollection.insertOne(userinfo);
                const updateData = {
                  name: userinfo.username.split("@")[1],
                  profile_link: userinfo.profile_link,
                  username: userinfo.username,
                  bio: null,
                  profile_pic: null,
                  github_link: null,
                  portfolio_link: null,
                  hackerRank_link: null,
                  codeForce_link: null,
                  dribble_link: null,
                  linkedin_link: null,
                  facebook_link: null,
                  instagram_link: null,
                  twitter_link: null
                }
                const result2 = await userProfileCollection.insertOne(updateData)
    
                // Send both results as an array
                return res.send([result, userinfo, result2]);
            } catch (error) {
                console.error('Error inserting data into userProfileCollection:', error);
                return res.status(500).json({ error: 'Error inserting data into userProfileCollection.', code: 21 });
            }
        }
    });
    
    app.get('/count_view', async(req, res) =>{
        const loginuserdata = req.query.loginUSERNAME;
        const query = req.query.username
        const filter = {username: query}
        const option = {upsert: true}
        const userprofile = await userProfileCollection.findOne(filter)
        const old_views = userprofile.profile_view
        
        const updatedDoc = {
          $set: {
              profile_view: old_views ? old_views + 1 : 1
          }
        }

          if(req.query.loginUSERNAME === 'undefined'){
            const saveInfo = await userProfileCollection.updateOne(filter, updatedDoc, option)
            return res.send(saveInfo)
          }
          else{
            const visitedCollec = await visitedProfilesCollect.findOne({username: loginuserdata})
            if(visitedCollec?.visitedProfiles?.find(p => p.username === query)){
               return res.status(404).json({message: "Already added this user in user collection"})
            }
            else{
              const saveInfo = await userProfileCollection.updateOne(filter, updatedDoc, option)
              return res.send(saveInfo)
            }
          }
    })


    app.post('/visited_profile', async(req, res) => {
        const profile_data = req.body;
        const visitedCollec = await visitedProfilesCollect.findOne({username: profile_data.username})
        if(!visitedCollec){
          const result = await visitedProfilesCollect.insertOne(profile_data)
          return res.send(result)
        }
        else{
          const newData = {
            username: profile_data.visitedProfiles[0].username,
            profile_link: profile_data.visitedProfiles[0].profile_link
          }
          const filter = {username: profile_data.username}
          const option = {upsert: true}
          const updatedDoc = {
            $set: {
              visitedProfiles: [...visitedCollec.visitedProfiles, newData]
            }
          }
          if(visitedCollec.visitedProfiles.find(p => p.username === newData.username)){
              return res.status(404).json({message: "Already added this user in user collection"})
          }
          else{
            const result = await visitedProfilesCollect.updateOne(filter, updatedDoc, option)
            return res.send(result)
          }
        }
        // res.status(401).json({message: "Already visited this profile"})
    })


    // liked profile collection
    app.post('/likeprofile', async(req, res) => {
        const likedata = req.body;
        const existLikedPROFILE = await likedProfileCollect.findOne({username: likedata.username})
        if(existLikedPROFILE)
        {
          const alreadyLiked = existLikedPROFILE.likedProfiles.find(p => p.username === likedata.likedProfiles[0].username)
          if(alreadyLiked){
            return res.send(JSON.stringify({message: "Already liked"}))
          }
          else{
            const newData = {
              username: likedata.likedProfiles[0].username,
              liked_date: likedata.likedProfiles[0].liked_date
            }
            const filter = {username: likedata.username}
            const option = {upsert: true}
            const updatedDoc = {
              $set:{
                  likedProfiles: [...existLikedPROFILE.likedProfiles, newData]
              }
            }
            const result = await likedProfileCollect.updateOne(filter, updatedDoc, option)

            // for count like on profile data
            const likedprofile_username = likedata.likedProfiles[0].username
            const getUSERdata = await userProfileCollection.findOne({username: likedprofile_username})
            const old_likes = getUSERdata.profile_likes
            const filter2 = {username: likedprofile_username}
            const option2 = {upsert: true}
            const updatedDoc2 = {
              $set: {
                profile_likes: old_likes ? old_likes + 1 : 1
              }
            }
            const result2 = await userProfileCollection.updateOne(filter2, updatedDoc2, option2)

            return res.send([result,result2])
          }
        } 
        else {
            const result = await likedProfileCollect.insertOne(likedata)

            //
            // for count like on profile data
            const likedprofile_username = likedata.likedProfiles[0].username
            const getUSERdata = await userProfileCollection.findOne({username: likedprofile_username})
            const old_likes = getUSERdata.profile_likes
            const filter2 = {username: likedprofile_username}
            const option2 = {upsert: true}
            const updatedDoc2 = {
              $set: {
                profile_likes: old_likes ? old_likes + 1 : 1
              }
            }
            const result2 = await userProfileCollection.updateOne(filter2, updatedDoc2, option2)
            //

            return res.send([result, result2])
        }
    })

      app.get('/profilelike_history', async(req, res) => {
          const query = {username: req.query.username}
          const visiteProfile = req.query.visitprofile
          const existLikedPROFILE = await likedProfileCollect.findOne(query)
          if(existLikedPROFILE){
            const alreadyLiked = existLikedPROFILE.likedProfiles.find(p => p.username === visiteProfile)
            if(alreadyLiked){
              return res.send(JSON.stringify({liked: true}))
            }
            else{
              return res.send(JSON.stringify({liked: false}))
            }
          }
          else {
            return res.send(JSON.stringify({liked: false}));
        }
      })

      app.get('/likedcount', async(req, res) => {
          const query = req.query.username
          const result = await userProfileCollection.find({ "likedProfiles.username": query }).toArray();
          res.send(result)
      })

      app.get('/mylikedProfiles', async(req, res) => {
          const query = req.query.username
          const result = await likedProfileCollect.findOne({username: query})
          res.send(result)
      })

      // ranking by likedcount of profile
      app.get('/profile_ranking', async(req, res) => {
          const result = await userProfileCollection.find({}).sort({profile_likes: -1, profile_view: -1}).limit(10).toArray();
          res.send(result)
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
                discord_link: userdata.discord_link ? userdata.discord_link : null,
                resume_link: userdata.resume_link ? userdata.resume_link : null,
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
        const userAthenticate  = await usersCollection.findOne(query)
        if(userAthenticate?.username){
          // const result2 = await userProfileCollection.deleteOne({query})
          return res.send(userdata)
        }
        else{
          return res.send({message: 'This user is not registered!', code: 22})
        }
      })

      // admin access ///////////////////////////////////////////////////////////
      app.get('/alluserdata', async(req, res) => {
        const result = await userProfileCollection.find({}).toArray()
        res.send(result)
      })

      app.get('/allusers', async(req, res) => {
        const admin = req.query.admin
        const users = await usersCollection.find({}).toArray()
        const total_user = users.length
        if(admin === "sujoy"){
          return res.json({total_user})
        }
        if(admin === "409"){
          return res.send(users)
        }
    })

    app.get("/searchprofile", async (req, res) => {
      const username = req.query.username;
      console.log('username ',username.length)
      const filteredProfiles = await userProfileCollection.find({}).toArray();
      let filteredData;

      if (username.length < 1) {
          filteredData = [];
      } else {
          filteredData = filteredProfiles.filter(u =>
              u.username.toLowerCase().includes(`${username.toLowerCase()}`)
          );
      }
      // const filteredData = filteredProfiles.filter(u =>
      //     u.username.toLowerCase().includes(`${username.toLowerCase()}`)
      // );
      res.send(JSON.stringify(filteredData));
  });
  

    ////////////////////////////////////////////////////////////////////

      app.get('/login', async(req, res) => {
        const query = {
            username: req.query.username,
            password: req.query.pass
        }

        const userAccountInfo = await usersCollection.findOne(query)
        if(userAccountInfo && userAccountInfo?.password === query.password){
          const userToken = {
              username: userAccountInfo.username,
              user_token: `${userAccountInfo._id}%${userAccountInfo.username.split("@")[1]}`,
              join_date: userAccountInfo.join_date,
          }
          return res.send(userToken)
        }
        else{
          return res.json({message: 'Invalid user', code: 21})
        }
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
  console.log(`profile-view server listening on port ${port}`)
})