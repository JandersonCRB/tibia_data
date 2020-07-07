const fetchCharacter = require("./src/tibia_api/fetchCharacter");
const fetchPlayers = require("./src/tibia_api/fetchPlayers");
const Discord = require("discord.js");
const client = new Discord.Client();

client.once("ready", () => {
  console.log("Ready!");
});

client.on("message", async message => {
  if (message.content === "!online") {
    const characters = await fetchPlayers('Celebra');
    const resp = characters.map(char => {
      return [
        `Nome: ${char.name}`.padEnd(35, " "),
        `Level: ${char.level}`.padEnd(4, "  "),
        `Vocação: ${char.vocation}`
      ].join("  |  ");
    });
    message.channel.send(resp, { split: true });
  } else if (message.content.startsWith('!add')) {
    const charName = message.content.replace('!add ', '');
    const char = await fetchCharacter(charName);
    const resp = [
      `Nome: ${char.name}`,
      `Level: ${char.level}`,
      `Vocação: ${char.vocation}`,
      `Mundo: ${char.world}`,
    ].join("\n");
    message.channel.send(resp, { split: true });
  }
});

client
  .login("NjU2OTU1NDA5NjU5MDY4NDY0.XjjHSQ.jkz1Ahm8foKe-ZS7bhMvAaNt4nE")
  .catch(e => console.error(e));
