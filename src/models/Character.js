class Character {
    constructor({ name, url, level, vocation, world, status } = {}) {
        this.name = name;
        this.url = url;
        this.level = level;
        this.vocation = vocation;
        this.world = world;
        this.status = status
    }
}

module.exports = Character;
