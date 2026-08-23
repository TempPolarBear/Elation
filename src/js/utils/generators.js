import rarities from "../data/rarities.js";
import buffs from "../data/buffs.js";
import enchantments from "../data/enchantments.js";

function generateCharacterStats(characterClass) {
    let attack, defense, magic;

    switch (characterClass) {
        case "Warrior":
            attack = Math.floor(Math.random() * 11) + 25;
            defense = Math.floor(Math.random() * 11) + 30;
            magic = Math.floor(Math.random() * 6) + 5;
            break;

        case "Archer":
            attack = Math.floor(Math.random() * 11) + 30;
            defense = Math.floor(Math.random() * 11) + 15;
            magic = Math.floor(Math.random() * 11) + 10;
            break;

        case "Assassin":
            attack = Math.floor(Math.random() * 11) + 35;
            defense = Math.floor(Math.random() * 11) + 10;
            magic = Math.floor(Math.random() * 11) + 5;
            break;

        case "Mage":
            attack = Math.floor(Math.random() * 11) + 10;
            defense = Math.floor(Math.random() * 11) + 10;
            magic = Math.floor(Math.random() * 16) + 35;
            break;

        default:
            attack = 0;
            defense = 0;
            magic = 0;
            break;
    }

    return { attack, defense, magic, gold: 100 };
}

function generateWeaponStats() {
    const damage = Math.floor(Math.random() * 21) + 15;
    const durability = Math.floor(Math.random() * 31) + 70;
    const rarity = rarities[Math.floor(Math.random() * rarities.length)];
    const enchantment =
        enchantments[Math.floor(Math.random() * enchantments.length)];

    return {
        damage,
        durability,
        rarity,
        enchantment,
    };
}

function generateArmorStats() {
    const defense = Math.floor(Math.random() * 21) + 10;
    const durability = Math.floor(Math.random() * 31) + 70;
    const rarity = rarities[Math.floor(Math.random() * rarities.length)];
    const enchantment =
        enchantments[Math.floor(Math.random() * enchantments.length)];

    return {
        defense,
        durability,
        rarity,
        enchantment,
    };
}

function generatePetStats() {
    const attack = Math.floor(Math.random() * 16) + 5;
    const rarity = rarities[Math.floor(Math.random() * rarities.length)];
    const buff = buffs[Math.floor(Math.random() * buffs.length)];

    return {
        attack,
        rarity,
        buff,
    };
}

export {
    generateCharacterStats,
    generateWeaponStats,
    generateArmorStats,
    generatePetStats,
};