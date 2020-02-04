const cheerio = require("cheerio");
const cloudscraper = require("cloudscraper");
const Character = require("../models/Character");

module.exports = async charName => {
  try {
    const formattedCharName = charName.replace(new RegExp(" ", "g"), "+");
    const url = `https://www.tibia.com/community/?subtopic=characters&name=${formattedCharName}`;
    const r = await cloudscraper.get(url);
    const $ = cheerio.load(r);
    const char = new Character({ url });
    const tableKeys = {
      "Name:": "name",
      "Level:": "level",
      "Vocation:": "vocation",
      "World:": "world"
    };

    $("tbody")["0"].children.forEach((tr) => {
      if (tr.children.length === 2) {
        const [titleTd, contentTd] = tr.children;
        const title = titleTd.children[0].data;
        const content = contentTd.children[0].data;
        if (Object.keys(tableKeys).includes(title)) {
          char[tableKeys[title]] = content;
        }
      }
    });
    return char;
  } catch (e) {
    console.error(e);
    return null;
  }
};
