class Character {
    #name;
    #characterClass;
    #attack;
    #defense;
    #magic;
    #gold;
    #weapon;
    #armor;
    #pet;

    constructor(name, characterClass, attack, defense, magic, gold, weapon, armor, pet) {
        this.#name = name;
        this.#characterClass = characterClass;
        this.#attack = attack;
        this.#defense = defense;
        this.#magic = magic;
        this.#gold = gold;
        this.#weapon = weapon;
        this.#armor = armor;
        this.#pet = pet;
    }

    get name() {
        return this.#name;
    }

    get characterClass() {
        return this.#characterClass;
    }

    get attack() {
        return this.#attack;
    }

    get defense() {
        return this.#defense;
    }

    get magic() {
        return this.#magic;
    }

    get gold() {
        return this.#gold;
    }

    get weapon() {
        return this.#weapon;
    }

    get armor() {
        return this.#armor;
    }

    get pet() {
        return this.#pet;
    }

}
export default Character;