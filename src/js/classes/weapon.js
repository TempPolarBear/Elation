class Weapon {
    #type;
    #damage;
    #durability;
    #enchantment;
    #rarity;

    constructor(type, damage, durability, enchantment, rarity) {
        this.#type = type;
        this.#damage = damage;
        this.#durability = durability;
        this.#enchantment = enchantment;
        this.#rarity = rarity;
    }

    get type() {
        return this.#type;
    }

    get damage() {
        return this.#damage;
    }

    get durability() {
        return this.#durability;
    }

    get enchantment() {
        return this.#enchantment;
    }

    get rarity() {
        return this.#rarity;
    }
}

export default Weapon;