// const express = require('express')
// const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// const app = express()
// const port = process.env.PORT || 5000 
// const router = express.Router();
// //http://localhost:5000/

// const cors = require('cors');
// require('dotenv').config();

// // middleware 
// app.use(express.json())
// app.use(cors())

// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.6ke0m0t.mongodb.net/?retryWrites=true&w=majority`;
// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });


// function allProfiles (){
//     router.get('/alluserdata', async(req, res) => {
//         const result = await userProfileCollection.find({}).toArray()
//         res.send(result)
//       })
    
//     //   app.get('/allusers', async(req, res) => {
//     //     const admin = req.query.admin
//     //     const users = await usersCollection.find({}).toArray()
//     //     const total_user = users.length
//     //     if(admin === "sujoy"){
//     //       return res.json({total_user})
//     //     }
//     //     if(admin === "409"){
//     //       return res.send(users)
//     //     }
//     // })
// }

// module.exports = {allProfiles}