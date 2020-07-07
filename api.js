const {parseText} = require("./src/tibia_api/parseHuntAnalyzer");
import fetchCharacter from './src/tibia_api/fetchCharacter'
const fetchPlayers = require("./src/tibia_api/fetchPlayers");
const bodyParser = require('body-parser')
const express = require("express");
const app = express();

const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (key, value) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};

// parse various different custom JSON types as JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let characters = [];

const updateCharacters = async () => {
  // console.log("fetch");
  const newPlayers = await fetchPlayers("Dibra");
  newPlayers.forEach(player => {
    if (!characters.find(search => search.name === player.name)) {
      console.log(`${player.name} signed in`);
    }
  });
  characters.forEach(player => {
    if (!newPlayers.find(search => search.name === player.name)) {
      console.log(`${player.name} signed out`);
    }
  });
  characters = newPlayers;
};

updateCharacters();
setInterval(updateCharacters, 5 * 1000);

app.get("/", async (req, res) => {
  res.send(characters);
});

app.post("/parse_hunt", async (req, res) => {
  const partyData = parseText(req.body.analyser);
  for (let i = 0;i < partyData.chars.length;i++) {
    const char = partyData.chars[i];
    const charInfo = fetchCharacter(char.name);
    console.log(charInfo)
    char['character'] = await fetchCharacter(char.name);
  }
  partyData.chars.forEach(char => {

  })
  res.json(partyData);
});

app.listen(3000, () => console.log("Example app listening on port 3000!"));
