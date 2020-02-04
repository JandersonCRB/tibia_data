class Character {
    constructor({ name, url, level, vocation, world } = {}) {
        this.name = name;
        this.url = url;
        this.level = level;
        this.vocation = vocation;
        this.world = world;
    }
}

module.exports = Character;