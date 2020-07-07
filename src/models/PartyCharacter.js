export default class PartyCharacter {
  constructor({
    name,
    loot,
    isLeader,
    supplies,
    balance,
    damage,
    healing,
  } = {}) {
    this.name = name;
    this.loot = loot;
    this.isLeader = isLeader;
    this.supplies = supplies;
    this.balance = balance;
    this.damage = damage;
    this.healing = healing;
    if (loot - supplies !== balance) {
      throw new Error("Balance differs from loot minus supplies calc");
    }
  }
}
