class Armor {
    #type;
    #material;
    #defense;
    #durability;
    #enchantment;
    #rarity;

    constructor(type, material, defense, durability, enchantment, rarity) {
        this.#type = type;
        this.#material = material;
        this.#defense = defense;
        this.#durability = durability;
        this.#enchantment = enchantment;
        this.#rarity = rarity;
    }

    get type() {
        return this.#type;
    }

    get material() {
        return this.#material;
    }

    get defense() {
        return this.#defense;
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

export default Armor;