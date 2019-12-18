const cheerio = require("cheerio");
const cloudscraper = require("cloudscraper");

cloudscraper
  .get("https://www.tibia.com/community/?subtopic=worlds&world=Celebra")
  .then(r => {
    const $ = cheerio.load(r);
    // console.log($('tr .Odd')[0].children[0].children[1].children[0].data)
    $("tbody")["5"].children.forEach((tr, index) => {
      if (index === 0) return;
      if (tr.type !== "tag") return;
      const className = tr.attribs.class;
      if (className !== "Odd" && className !== "Even") return;
      const linkTag = tr.children[0].children[0];
      const nameTag =
        linkTag.attribs.name === undefined ? linkTag : linkTag.next;
      const charName = nameTag.children[0].data;
      const charUrl = nameTag.attribs.href;
      const charLevel = parseInt(tr.children[1].children[0].data, 10);
      const charVocation = tr.children[2].children[0].data;
      const character = {
        charName,
        charUrl,
        charLevel,
        charVocation
      };
      console.log(character);
    });
  })
  .catch(e => console.log(e));
