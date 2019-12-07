
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
// Kayn setup
const { Kayn, REGIONS } = require('kayn');
const kayn = Kayn(process.env.RIOT_LOL_API_KEY)({
  region: REGIONS.NORTH_AMERICA,
  apiURLPrefix: "https://%s.api.riotgames.com",
  locale: "en_US",
  debugOptions: {
    isEnabled: true,
    showKey: false
  },
  requestOptions: {
    shouldRetry: true,
    numberOfRetriesBeforeAbort: 3,
    delayBeforeRetry: 1000,
    burst: false,
    shouldExitOn403: false
  },
  cacheOptions: {
    cache: null,
    timeToLives: {
      useDefault: false,
      byGroup: {},
      byMethod: {}
    }
  }
});
const myID = process.env.ABSURDEST_LOL_SUMMONER_ID;

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get('/express_backend', (req, res) => {
  kayn.Summoner.by.name("Lady Spark")
  .callback(function(err, summoner){
    if (err) throw err;
    kayn.CurrentGame.by.summonerID(summoner.id)
    .callback(function(err, gameInfo){
      if (err) throw err;
      if (gameInfo) {
        console.log("Sending gameInfo..")
        console.log("GAME INFO PARSED: \n" + JSON.stringify(gameInfo));
        res.json(gameInfo)
      } else {
        console.log("No game found or there was an error...")
        res.send({express: "No game found or other error."})
      }
    })
  })
  // res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});