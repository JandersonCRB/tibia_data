const Character = require("../models/Character");

const cheerio = require("cheerio");
const cloudscraper = require("cloudscraper");

module.exports = async world => {
  const characters = [];
  try {
    const r = await cloudscraper.get(
      `https://www.tibia.com/community/?subtopic=worlds&world=${world}`
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
      const character = new Character({ name, url, level, vocation });
      characters.push(character);
    });
  } catch (e) {
    console.error(e);
    return null;
  }
  return characters;
};
