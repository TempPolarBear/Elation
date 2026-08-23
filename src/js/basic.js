import Character from "./classes/character.js";
import Weapon from "./classes/weapon.js";
import Armor from "./classes/armor.js";
import Pet from "./classes/pet.js";

import {
    generateCharacterStats,
    generateWeaponStats,
    generateArmorStats,
    generatePetStats,
} from "./utils/generators.js";

import {
    CharacterHelper,
    getRarityBadge,
} from "./utils/helpers.js";

import renderCharacters from "./utils/render.js";

// | Класс        | Attack | Defense | Magic |
// | 🛡️ Warrior   | 25–35  | 30–40   | 5–10 |
// | 🏹 Archer    | 30–40  | 15–25   | 10–20 |
// | 🗡️ Assassin  | 35–45  | 10–20   | 5–15 |
// | 🔮 Mage      | 10–20  | 10–20   | 35–50 |

// Остальное:

// 💰 Gold — всегда 100
// ⚔️ Weapon Damage — 15–35
// ⚒️ Weapon Durability — 70–100
// 🛡️ Armor Defense — 10–30
// 🛡️ Armor Durability — 70–100
// 🐾 Pet Attack — 5–20

// Редкость
// Common
// Uncommon
// Rare
// Epic
// Legendary
// Mythical

// Бафф питомца
// +10 Attack
// +10 Defense
// +15 Magic
// +20 Health
// +5 Speed
// Critical Chance +10%


const createCharacterBtn = document.querySelector("#createCharacter");

const characters = [];

const characterList = document.querySelector("#characterList");
const characterClassSelect = document.querySelector("#characterClass");


characterClassSelect.addEventListener("change", function () {
    const characterStats = generateCharacterStats(
        characterClassSelect.value
    );

    document.querySelector("#characterAttack").value =
        characterStats.attack;

    document.querySelector("#characterDefense").value =
        characterStats.defense;

    document.querySelector("#characterMagic").value =
        characterStats.magic;

    document.querySelector("#characterGold").value =
        characterStats.gold;
});


createCharacterBtn.addEventListener("click", function () {

    // Character
    const name = document.querySelector("#characterName").value;
    const characterClass =
        document.querySelector("#characterClass").value;

    // Weapon
    const weaponType =
        document.querySelector("#weaponType").value;

    // Armor
    const armorType =
        document.querySelector("#armorType").value;

    const armorMaterial =
        document.querySelector("#armorMaterial").value;

    // Pet
    const petName =
        document.querySelector("#petName").value;

    const petSpecies =
        document.querySelector("#petSpecies").value;


    // Character stats
    const characterStats = {
        attack: Number(
            document.querySelector("#characterAttack").value
        ),

        defense: Number(
            document.querySelector("#characterDefense").value
        ),

        magic: Number(
            document.querySelector("#characterMagic").value
        ),

        gold: Number(
            document.querySelector("#characterGold").value
        ),
    };


    // Weapon stats
    const weaponStats = generateWeaponStats();

    document.querySelector("#weaponDamage").value =
        weaponStats.damage;

    document.querySelector("#weaponDurability").value =
        weaponStats.durability;

    document.querySelector("#weaponEnchantment").value =
        weaponStats.enchantment;

    document.querySelector("#weaponRarity").value =
        weaponStats.rarity;


    // Armor stats
    const armorStats = generateArmorStats();

    document.querySelector("#armorDefense").value =
        armorStats.defense;

    document.querySelector("#armorDurability").value =
        armorStats.durability;

    document.querySelector("#armorEnchantment").value =
        armorStats.enchantment;

    document.querySelector("#armorRarity").value =
        armorStats.rarity;


    // Pet stats
    const petStats = generatePetStats();

    document.querySelector("#petAttack").value =
        petStats.attack;

    document.querySelector("#petBuff").value =
        petStats.buff;

    document.querySelector("#petRarity").value =
        petStats.rarity;


    // Create Weapon
    const weapon = new Weapon(
        weaponType,
        weaponStats.damage,
        weaponStats.durability,
        weaponStats.enchantment,
        weaponStats.rarity
    );


    // Create Armor
    const armor = new Armor(
        armorType,
        armorMaterial,
        armorStats.defense,
        armorStats.durability,
        armorStats.enchantment,
        armorStats.rarity
    );


    // Create Pet
    const pet = new Pet(
        petName,
        petSpecies,
        petStats.buff,
        petStats.rarity,
        petStats.attack
    );


    // Create Character
    const character = new Character(
        name,
        characterClass,
        characterStats.attack,
        characterStats.defense,
        characterStats.magic,
        characterStats.gold,
        weapon,
        armor,
        pet
    );


    characters.push(character);

    renderCharacters(characters, characterList);


    // Modal content
    document.querySelector("#characterModalBody").innerHTML = `
        <h1 class="text-center mb-3">
            ⚔️ ${character.name}
            ${CharacterHelper.isLegendary(character) ? "⭐" : ""}
            ⚔️
        </h1>

        <h5 class="text-center text-muted mb-4">
            ${character.characterClass}
        </h5>

        <h4 class="text-center mb-3">
            📊 Character Statistics
        </h4>

        <div class="card border-dark mb-3">
            <div class="card-header fw-bold">
                📊 Statistics
            </div>

            <div class="card-body">
                <p>⚔️ Attack: ${character.attack}</p>
                <p>🛡️ Defense: ${character.defense}</p>
                <p>✨ Magic: ${character.magic}</p>
                <p>💰 Gold: ${character.gold}</p>
            </div>
        </div>

        <div class="card border-danger mb-3">
            <div class="card-header fw-bold">
                ⚔️ Weapon
            </div>

            <div class="card-body">
                <p>Type: ${weapon.type}</p>
                <p><b>Damage:</b> ${weapon.damage}</p>
                <p>Durability: ${weapon.durability}</p>
                <p>Enchantment: ${weapon.enchantment}</p>
                <p>Rarity: ${getRarityBadge(weapon.rarity)}</p>
            </div>
        </div>

        <div class="card border-primary mb-3">
            <div class="card-header fw-bold">
                🛡️ Armor
            </div>

            <div class="card-body">
                <p>Type: ${armor.type}</p>
                <p>Material: ${armor.material}</p>
                <p>Defense: ${armor.defense}</p>
                <p>Durability: ${armor.durability}</p>
                <p>Enchantment: ${armor.enchantment}</p>
                <p>Rarity: ${getRarityBadge(armor.rarity)}</p>
            </div>
        </div>

        <div class="card border-success mb-3">
            <div class="card-header fw-bold">
                🐾 Pet
            </div>

            <div class="card-body">
                <p>Name: ${pet.name}</p>
                <p>Species: ${pet.species}</p>
                <p>Buff: ${pet.buff}</p>
                <p>Attack: ${pet.attack}</p>
                <p>Rarity: ${getRarityBadge(pet.rarity)}</p>
            </div>
        </div>
    `;


    // Modal
    const modal = new bootstrap.Modal(
        document.querySelector("#characterModal")
    );

    const modalTitle =
        document.querySelector("#modalTitle");

    const modalHeader =
        document.querySelector(".modal-header");


    modalTitle.className = "modal-title";
    modalHeader.className = "modal-header";


    if (character.weapon.rarity === "Common") {
        modalTitle.classList.add("text-secondary");

        modalHeader.classList.add(
            "bg-secondary",
            "text-white"
        );

        modalTitle.innerHTML =
            "⚪ Common Character";
    }


    if (character.weapon.rarity === "Uncommon") {
        modalTitle.classList.add("text-success");

        modalHeader.classList.add(
            "bg-success",
            "text-white"
        );

        modalTitle.innerHTML =
            "🟢 Uncommon Character";
    }


    if (character.weapon.rarity === "Rare") {
        modalTitle.classList.add("text-primary");

        modalHeader.classList.add(
            "bg-primary",
            "text-white"
        );

        modalTitle.innerHTML =
            "🔵 Rare Character";
    }


    if (character.weapon.rarity === "Epic") {
        modalTitle.classList.add("text-dark");

        modalHeader.classList.add(
            "bg-dark",
            "text-white"
        );

        modalTitle.innerHTML =
            "🟣 Epic Character";
    }


    if (character.weapon.rarity === "Legendary") {
        modalTitle.classList.add("text-warning");

        modalHeader.classList.add("bg-warning");

        modalTitle.innerHTML =
            "⭐ Legendary Character";
    }


    if (character.weapon.rarity === "Mythical") {
        modalTitle.classList.add("text-danger");

        modalHeader.classList.add(
            "bg-danger",
            "text-white"
        );

        modalTitle.innerHTML =
            "🔥 Mythical Character";
    }


    modal.show();


    // Reset Character
    document.querySelector("#characterName").value = "";

    document.querySelector("#characterClass").selectedIndex = 0;

    document.querySelector("#characterAttack").value = "";

    document.querySelector("#characterDefense").value = "";

    document.querySelector("#characterMagic").value = "";

    document.querySelector("#characterGold").value = "";


    // Reset Weapon
    document.querySelector("#weaponType").selectedIndex = 0;

    document.querySelector("#weaponDamage").value = "";

    document.querySelector("#weaponDurability").value = "";

    document.querySelector("#weaponEnchantment").value = "";

    document.querySelector("#weaponRarity").selectedIndex = 0;


    // Reset Armor
    document.querySelector("#armorType").selectedIndex = 0;

    document.querySelector("#armorMaterial").selectedIndex = 0;

    document.querySelector("#armorDefense").value = "";

    document.querySelector("#armorDurability").value = "";

    document.querySelector("#armorEnchantment").value = "";

    document.querySelector("#armorRarity").selectedIndex = 0;


    // Reset Pet
    document.querySelector("#petName").value = "";

    document.querySelector("#petSpecies").selectedIndex = 0;

    document.querySelector("#petBuff").value = "";

    document.querySelector("#petAttack").value = "";

    document.querySelector("#petRarity").selectedIndex = 0;


    console.log(characters);
});