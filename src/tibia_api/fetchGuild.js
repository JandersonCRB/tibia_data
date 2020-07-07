const Character = require("../models/Character");

const cheerio = require("cheerio");
const cloudscraper = require("cloudscraper");

module.exports = async guild => {
  const characters = [];
  try {
    const r = await cloudscraper.get(
      `https://www.tibia.com/community/?subtopic=guilds&page=view&GuildName=${guild}`
    );
    const $ = cheerio.load(r);
    $("tbody")["11"].children.forEach((tr, index) => {
      if (index === 0) return;
      if (tr.type !== "tag") return;
      const linkTag = tr.children[2].children[0];
      const nameTag =
        linkTag.attribs.name === undefined ? linkTag : linkTag.next;
      const name = nameTag.children[0].data;
      const url = nameTag.attribs.href;
      const vocation = tr.children[4].children[0].data;
      const level = parseInt(tr.children[6].children[0].data, 10);
      const status = tr.children[10].children[0].children[0].data || tr.children[10].children[0].children[0].children[0].data;
      const character = new Character({ name, url, level, vocation, status });
      characters.push(character);
    });
  } catch (e) {
    console.error(e);
    return null;
  }
  return characters;
};
