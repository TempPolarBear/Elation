class Pet {
    #name;
    #species;
    #buff;
    #rarity;
    #attack;

    constructor(name, species, buff, rarity, attack) {
        this.#name = name;
        this.#species = species;
        this.#buff = buff;
        this.#rarity = rarity;
        this.#attack = attack;
    }

    get name() {
        return this.#name;
    }

    get species() {
        return this.#species;
    }

    get buff() {
        return this.#buff;
    }

    get rarity() {
        return this.#rarity;
    }

    get attack() {
        return this.#attack;
    }
}

export default Pet;