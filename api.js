const fetchPlayers = require("./src/tibia_api/fetchPlayers");
const express = require("express");
const app = express();

let characters = [];

const updateCharacters = async () => {
  console.log("fetch");
  const newPlayers = await fetchPlayers("Celebra");
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

app.listen(3000, () => console.log("Example app listening on port 3000!"));
