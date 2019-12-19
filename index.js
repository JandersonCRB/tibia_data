const cheerio = require("cheerio");
const cloudscraper = require("cloudscraper");
const Discord = require("discord.js");
const client = new Discord.Client();

client.once("ready", () => {
  console.log("Ready!");
});

const fetchPlayers = async world => {
  const characters = [];
  try {
    const r = await cloudscraper.get(
      "https://www.tibia.com/community/?subtopic=worlds&world=Celebra"
    );
    const $ = cheerio.load(r);
    $("tbody")["5"].children.forEach((tr, index) => {
      if (index === 0) return;
      if (tr.type !== "tag") return;
      const className = tr.attribs.class;
      if (className !== "Odd" && className !== "Even") return;
      const linkTag = tr.children[0].children[0];
      const nameTag =
        linkTag.attribs.name === undefined ? linkTag : linkTag.next;
      const name = nameTag.children[0].data;
      const url = nameTag.attribs.href;
      const level = parseInt(tr.children[1].children[0].data, 10);
      const vocation = tr.children[2].children[0].data;
      const character = {
        name,
        url,
        level,
        vocation
      };
      characters.push(character);
    });
  } catch (e) {
    console.error(e);
    return null;
  }
  return characters;
};

client.on("message", async message => {
  if (message.content === "!online") {
    const characters = await fetchPlayers();
    const resp = characters.map(char => {
      return [
        `Nome: ${char.name}`.padEnd(35, " "),
        `Level: ${char.level}`.padEnd(4, "  "),
        `Vocação: ${char.vocation}`
      ].join("  |  ");
    });
    console.log(resp.length);
    message.channel.send(resp, { split: true });
  }
});

client
  .login("NjU2OTU1NDA5NjU5MDY4NDY0.XfqLjg.7ybjoNRRwry0sOdW3qAAHF2g1Hk")
  .catch(e => console.error(e));
