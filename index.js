const fetchCharacter = require("./src/tibia_api/fetchCharacter");
const fetchPlayers = require("./src/tibia_api/fetchPlayers");
const fetchGuild = require("./src/tibia_api/fetchGuild");
// const Discord = require("discord.js");
// const client = new Discord.Client();

module.exports = { fetchPlayers, fetchGuild, fetchCharacter };
//
// const COMMAND_SYMBOL = "!";
//
// client.once("ready", () => {
//   console.log("Ready!");
// });
//
// const commands = {
//   online: async (message, args) => {
//     const [world] = args;
//     const characters = await fetchPlayers(world);
//     const resp = characters.map(char => {
//       return [
//         `Nome: ${char.name}`.padEnd(35, " "),
//         `Level: ${char.level}`.padEnd(4, "  "),
//         `Vocação: ${char.vocation}`
//       ].join("  |  ");
//     });
//     message.channel.send(resp, { split: true });
//   },
//   add: async (message, args) => {
//     const charName = args.join(' ');
//     const char = await fetchCharacter(charName);
//     const resp = [
//       `Nome: ${char.name}`,
//       `Level: ${char.level}`,
//       `Vocação: ${char.vocation}`,
//       `Mundo: ${char.world}`
//     ].join("\n");
//     message.channel.send(resp, { split: true });
//   },
//   default: (message, args) => {
//     message.channel.send("Comando não encontrado");
//   }
// };
//
// const processMessage = message => {
//   let { content } = message;
//   if (content.startsWith(COMMAND_SYMBOL)) {
//     content = content.replace(COMMAND_SYMBOL, "");
//     const [command, ...args] = content.split(" ");
//     if (Object.keys(commands).includes(command)) {
//       commands[command](message, args);
//     } else {
//       commands["default"](message);
//     }
//   }
// };
//
// client.on("message", processMessage);
//
// client.login(process.env.DISCORD_TOKEN).catch(e => console.error(e));
