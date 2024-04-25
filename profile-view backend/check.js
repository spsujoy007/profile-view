app.post('/visited_profile', async (req, res) => {
    const profile_data = req.body;
    
    try {
      const visitedCollec = await visitedProfilesCollect.findOne({ username: profile_data.username });
  
      if (!visitedCollec) {
        const result = await visitedProfilesCollect.insertOne(profile_data);
        console.log(result);
        return res.send(result);
      } else {
        const previousVisitedProfiles = visitedCollec.visitedProfiles || []; // Get previous visitedProfiles or use an empty array if it doesn't exist
  
        const newData = {
          username: profile_data.visitedProfiles,
          profile_link: profile_data.profile_link
        };
  
        const filter = { username: profile_data.username };
        const option = { upsert: true };
        const updatedDoc = {
          $set: {
            visitedProfiles: [...previousVisitedProfiles, newData] // Add newData to previousVisitedProfiles
          }
        };
  
        const result = await visitedProfilesCollect.updateOne(filter, updatedDoc, option);
        console.log(result);
  
        // Send back previous visitedProfiles
        res.send(previousVisitedProfiles);
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send({ error: 'Server error' });
    }
  });
  