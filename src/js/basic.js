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

// ELEMENTS

const createCharacterBtn = document.querySelector("#createCharacter");
const characterList = document.querySelector("#characterList");

const characterClassSelect = document.querySelector("#characterClass");
const characterAvatar = document.querySelector("#characterAvatar");
const randomizeAvatar = document.querySelector("#randomizeAvatar");

const characterStep = document.querySelector("#characterStep");
const weaponStep = document.querySelector("#weaponStep");
const armorStep = document.querySelector("#armorStep");
const petStep = document.querySelector("#petStep");

const nextToWeapon = document.querySelector("#nextToWeapon");
const nextToArmor = document.querySelector("#nextToArmor");
const nextToPet = document.querySelector("#nextToPet");

const backToCharacter = document.querySelector("#backToCharacter");
const backToWeapon = document.querySelector("#backToWeapon");
const backToArmor = document.querySelector("#backToArmor");

const characterPreviewName =
    document.querySelector("#characterPreviewName");

const characterPreviewClass =
    document.querySelector("#characterPreviewClass");

const characterNameInput =
    document.querySelector("#characterName");

// AVATAR

const characterColors = {
    Warrior: "b6d7a8",
    Mage: "c9b6e4",
    Archer: "b6e0d5",
    Assassin: "d4a5a5",
};

const defaultAvatar =
    "https://placehold.co/200x250/e9ecef/6c757d?text=Choose+Class";

// LOCAL STORAGE

const STORAGE_KEY = "characters";

let weaponStats;
let armorStats;
let petStats;

const characters = [];

// SAVE

function saveCharacters() {
    const charactersToSave = characters.map(character => ({
        name: character.name,
        characterClass: character.characterClass,
        attack: character.attack,
        defense: character.defense,
        magic: character.magic,
        gold: character.gold,
        avatar: character.avatar,

        weapon: {
            type: character.weapon.type,
            damage: character.weapon.damage,
            durability: character.weapon.durability,
            enchantment: character.weapon.enchantment,
            rarity: character.weapon.rarity,
        },

        armor: {
            type: character.armor.type,
            material: character.armor.material,
            defense: character.armor.defense,
            durability: character.armor.durability,
            enchantment: character.armor.enchantment,
            rarity: character.armor.rarity,
        },

        pet: {
            name: character.pet.name,
            species: character.pet.species,
            buff: character.pet.buff,
            rarity: character.pet.rarity,
            attack: character.pet.attack,
        },
    }));

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(charactersToSave)
    );
}

// LOAD

function loadCharacters() {
    const savedCharacters =
        localStorage.getItem(STORAGE_KEY);

    if (!savedCharacters) {
        return;
    }

    try {
        const parsedCharacters =
            JSON.parse(savedCharacters);

        if (!Array.isArray(parsedCharacters)) {
            return;
        }

        characters.push(
            ...parsedCharacters.filter(character =>
                character &&
                character.weapon &&
                character.armor &&
                character.pet
            )
        );
    } catch (error) {
        console.error("Cannot load characters:", error);
    }
}

loadCharacters();

renderCharacters(
    characters,
    characterList
);

// VALIDATION

function isSelectEmpty(select) {
    return (
        !select ||
        select.selectedIndex === 0 ||
        !select.value ||
        select.value === "Select type" ||
        select.value === "Select class" ||
        select.value === "Select material" ||
        select.value === "Select species"
    );
}

// VALIDATION MODAL

function createValidationModal() {
    let modal = document.querySelector("#validationModal");

    if (modal) {
        return modal;
    }

    document.body.insertAdjacentHTML(
        "beforeend",
        `
        <div
            class="modal fade"
            id="validationModal"
            tabindex="-1"
            aria-hidden="true"
        >
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content border-0 shadow-lg rounded-4 overflow-hidden">

                    <div class="modal-header bg-dark text-white">
                        <h5 class="modal-title fw-bold">
                            ⚠️ Incomplete
                        </h5>

                        <button
                            type="button"
                            class="btn-close btn-close-white"
                            data-bs-dismiss="modal"
                        ></button>
                    </div>

                    <div class="modal-body text-center py-4">

                        <div class="fs-1 mb-3">
                            ⚠️
                        </div>

                        <p
                            id="validationMessage"
                            class="fs-5 mb-0"
                        ></p>

                    </div>

                    <div class="modal-footer border-0 justify-content-center pb-4">

                        <button
                            type="button"
                            class="btn btn-dark px-4"
                            data-bs-dismiss="modal"
                        >
                            ✓ Got it
                        </button>

                    </div>

                </div>
            </div>
        </div>
        `
    );

    return document.querySelector("#validationModal");
}

function showValidationMessage(message) {
    const modalElement = createValidationModal();

    modalElement.querySelector(
        "#validationMessage"
    ).textContent = message;

    const modal =
        bootstrap.Modal.getOrCreateInstance(
            modalElement
        );

    modal.show();
}

// AVATAR

function generateAvatar() {
    const selectedClass =
        characterClassSelect.value;

    if (isSelectEmpty(characterClassSelect)) {
        characterAvatar.src = defaultAvatar;
        randomizeAvatar.disabled = true;
        return;
    }

    const seed =
        `${selectedClass}-${Date.now()}-${Math.random()}`;

    characterAvatar.src =
        `https://api.dicebear.com/10.x/adventurer/svg?seed=${seed}&backgroundColor=${characterColors[selectedClass]}`;

    randomizeAvatar.disabled = false;
}

// VIEW DETAILS

function showCharacterDetails(character) {
    const weapon = character.weapon || {};
    const armor = character.armor || {};
    const pet = character.pet || {};

    const modalBody =
        document.querySelector("#characterModalBody");

    const modalElement =
        document.querySelector("#characterModal");

    if (!modalBody || !modalElement) {
        return;
    }

    modalBody.innerHTML = `
        <div class="text-center mb-4">
            <img
                src="${character.avatar || defaultAvatar}"
                alt="${character.name || "Character"}"
                class="img-fluid rounded-4"
                style="max-width:220px;"
            >
        </div>

        <h2 class="text-center mb-2">
            ⚔️ ${character.name || "Unknown"}
        </h2>

        <h5 class="text-center text-muted mb-4">
            ${character.characterClass || "Unknown class"}
        </h5>

        <div class="card mb-3">
            <div class="card-header fw-bold">
                📊 Statistics
            </div>

            <div class="card-body">
                <p>⚔️ <strong>Attack:</strong> ${character.attack || 0}</p>
                <p>🛡️ <strong>Defense:</strong> ${character.defense || 0}</p>
                <p>✨ <strong>Magic:</strong> ${character.magic || 0}</p>
                <p>💰 <strong>Gold:</strong> ${character.gold || 0}</p>
            </div>
        </div>

        <div class="card mb-3">
            <div class="card-header fw-bold">
                ⚔️ Weapon
            </div>

            <div class="card-body">
                <p><strong>Type:</strong> ${weapon.type || "Unknown"}</p>
                <p><strong>Damage:</strong> ${weapon.damage || 0}</p>
                <p><strong>Durability:</strong> ${weapon.durability || 0}</p>
                <p><strong>Enchantment:</strong> ${weapon.enchantment || "None"}</p>
                <p>
                    <strong>Rarity:</strong>
                    ${getRarityBadge(weapon.rarity || "Common")}
                </p>
            </div>
        </div>

        <div class="card mb-3">
            <div class="card-header fw-bold">
                🛡️ Armor
            </div>

            <div class="card-body">
                <p><strong>Type:</strong> ${armor.type || "Unknown"}</p>
                <p><strong>Material:</strong> ${armor.material || "Unknown"}</p>
                <p><strong>Defense:</strong> ${armor.defense || 0}</p>
                <p><strong>Durability:</strong> ${armor.durability || 0}</p>
                <p><strong>Enchantment:</strong> ${armor.enchantment || "None"}</p>
                <p>
                    <strong>Rarity:</strong>
                    ${getRarityBadge(armor.rarity || "Common")}
                </p>
            </div>
        </div>

        <div class="card">
            <div class="card-header fw-bold">
                🐾 Pet
            </div>

            <div class="card-body">
                <p><strong>Name:</strong> ${pet.name || "Unknown"}</p>
                <p><strong>Species:</strong> ${pet.species || "Unknown"}</p>
                <p><strong>Buff:</strong> ${pet.buff || "None"}</p>
                <p><strong>Attack:</strong> ${pet.attack || 0}</p>
                <p>
                    <strong>Rarity:</strong>
                    ${getRarityBadge(pet.rarity || "Common")}
                </p>
            </div>
        </div>
    `;

    bootstrap.Modal
        .getOrCreateInstance(modalElement)
        .show();
}

document.addEventListener(
    "showCharacterDetails",
    event => {
        showCharacterDetails(event.detail);
    }
);

// CHARACTER → WEAPON

nextToWeapon.addEventListener(
    "click",
    event => {
        event.preventDefault();

        const name =
            characterNameInput.value.trim();

        const classEmpty =
            isSelectEmpty(characterClassSelect);

        if (!name && classEmpty) {
            showValidationMessage(
                "Please enter character name and choose a class."
            );
            return;
        }

        if (!name) {
            showValidationMessage(
                "Please enter character name."
            );
            return;
        }

        if (classEmpty) {
            showValidationMessage(
                "Please choose a character class."
            );
            return;
        }

        weaponStats =
            generateWeaponStats();

        document.querySelector("#weaponDamage").value =
            weaponStats.damage;

        document.querySelector("#weaponDurability").value =
            weaponStats.durability;

        document.querySelector("#weaponEnchantment").value =
            weaponStats.enchantment;

        document.querySelector("#weaponRarity").value =
            weaponStats.rarity;

        characterStep.classList.add("d-none");
        weaponStep.classList.remove("d-none");
    }
);

// WEAPON → CHARACTER

backToCharacter.addEventListener(
    "click",
    event => {
        event.preventDefault();

        weaponStep.classList.add("d-none");
        characterStep.classList.remove("d-none");
    }
);

// WEAPON → ARMOR

nextToArmor.addEventListener(
    "click",
    event => {
        event.preventDefault();

        const weaponType =
            document.querySelector("#weaponType");

        if (isSelectEmpty(weaponType)) {
            showValidationMessage(
                "Please choose a weapon type."
            );
            return;
        }

        armorStats =
            generateArmorStats();

        document.querySelector("#armorDefense").value =
            armorStats.defense;

        document.querySelector("#armorDurability").value =
            armorStats.durability;

        document.querySelector("#armorEnchantment").value =
            armorStats.enchantment;

        document.querySelector("#armorRarity").value =
            armorStats.rarity;

        weaponStep.classList.add("d-none");
        armorStep.classList.remove("d-none");
    }
);

// ARMOR → WEAPON

backToWeapon.addEventListener(
    "click",
    event => {
        event.preventDefault();

        armorStep.classList.add("d-none");
        weaponStep.classList.remove("d-none");
    }
);

// ARMOR → PET

nextToPet.addEventListener(
    "click",
    event => {
        event.preventDefault();

        const armorType =
            document.querySelector("#armorType");

        const armorMaterial =
            document.querySelector("#armorMaterial");

        const typeEmpty =
            isSelectEmpty(armorType);

        const materialEmpty =
            isSelectEmpty(armorMaterial);

        if (typeEmpty && materialEmpty) {
            showValidationMessage(
                "Please choose armor type and material."
            );
            return;
        }

        if (typeEmpty) {
            showValidationMessage(
                "Please choose an armor type."
            );
            return;
        }

        if (materialEmpty) {
            showValidationMessage(
                "Please choose armor material."
            );
            return;
        }

        petStats =
            generatePetStats();

        document.querySelector("#petAttack").value =
            petStats.attack;

        document.querySelector("#petBuff").value =
            petStats.buff;

        document.querySelector("#petRarity").value =
            petStats.rarity;

        armorStep.classList.add("d-none");
        petStep.classList.remove("d-none");
    }
);

// PET → ARMOR

backToArmor.addEventListener(
    "click",
    event => {
        event.preventDefault();

        petStep.classList.add("d-none");
        armorStep.classList.remove("d-none");
    }
);

// CHARACTER NAME

characterNameInput.addEventListener(
    "input",
    function () {
        characterPreviewName.textContent =
            this.value.trim() || "Your Character";
    }
);

// CHARACTER CLASS

characterClassSelect.addEventListener(
    "change",
    function () {
        if (isSelectEmpty(characterClassSelect)) {
            characterPreviewClass.textContent =
                "Choose your class";

            characterAvatar.src =
                defaultAvatar;

            randomizeAvatar.disabled = true;

            document.querySelector("#characterAttack").value = "";
            document.querySelector("#characterDefense").value = "";
            document.querySelector("#characterMagic").value = "";
            document.querySelector("#characterGold").value = "";

            return;
        }

        const stats =
            generateCharacterStats(
                characterClassSelect.value
            );

        document.querySelector("#characterAttack").value =
            stats.attack;

        document.querySelector("#characterDefense").value =
            stats.defense;

        document.querySelector("#characterMagic").value =
            stats.magic;

        document.querySelector("#characterGold").value =
            stats.gold;

        characterPreviewClass.textContent =
            characterClassSelect.value;

        generateAvatar();
    }
);

// RANDOMIZE AVATAR

randomizeAvatar.addEventListener(
    "click",
    event => {
        event.preventDefault();

        if (isSelectEmpty(characterClassSelect)) {
            showValidationMessage(
                "Please choose a character class first."
            );
            return;
        }

        generateAvatar();
    }
);

// CREATE CHARACTER

createCharacterBtn.addEventListener(
    "click",
    event => {
        event.preventDefault();

        const name =
            characterNameInput.value.trim();

        const characterClass =
            characterClassSelect.value;

        const classEmpty =
            isSelectEmpty(characterClassSelect);

        const weaponType =
            document.querySelector("#weaponType");

        const armorType =
            document.querySelector("#armorType");

        const armorMaterial =
            document.querySelector("#armorMaterial");

        const petName =
            document.querySelector("#petName").value.trim();

        const petSpecies =
            document.querySelector("#petSpecies");

        if (!name && classEmpty) {
            showValidationMessage(
                "Please enter character name and choose a class."
            );
            return;
        }

        if (!name) {
            showValidationMessage(
                "Please enter character name."
            );
            return;
        }

        if (classEmpty) {
            showValidationMessage(
                "Please choose a character class."
            );
            return;
        }

        if (isSelectEmpty(weaponType)) {
            showValidationMessage(
                "Please choose a weapon type."
            );
            return;
        }

        const armorTypeEmpty =
            isSelectEmpty(armorType);

        const armorMaterialEmpty =
            isSelectEmpty(armorMaterial);

        if (
            armorTypeEmpty &&
            armorMaterialEmpty
        ) {
            showValidationMessage(
                "Please choose armor type and material."
            );
            return;
        }

        if (armorTypeEmpty) {
            showValidationMessage(
                "Please choose an armor type."
            );
            return;
        }

        if (armorMaterialEmpty) {
            showValidationMessage(
                "Please choose armor material."
            );
            return;
        }

        const petSpeciesEmpty =
            isSelectEmpty(petSpecies);

        if (!petName && petSpeciesEmpty) {
            showValidationMessage(
                "Please enter pet name and choose a species."
            );
            return;
        }

        if (!petName) {
            showValidationMessage(
                "Please enter pet name."
            );
            return;
        }

        if (petSpeciesEmpty) {
            showValidationMessage(
                "Please choose a pet species."
            );
            return;
        }

        if (
            !weaponStats ||
            !armorStats ||
            !petStats
        ) {
            showValidationMessage(
                "Please complete all steps before creating your character."
            );
            return;
        }

        const characterStats = {
            attack: Number(
                document.querySelector(
                    "#characterAttack"
                ).value
            ),

            defense: Number(
                document.querySelector(
                    "#characterDefense"
                ).value
            ),

            magic: Number(
                document.querySelector(
                    "#characterMagic"
                ).value
            ),

            gold: Number(
                document.querySelector(
                    "#characterGold"
                ).value
            ),
        };

        const weapon =
            new Weapon(
                weaponType.value,
                weaponStats.damage,
                weaponStats.durability,
                weaponStats.enchantment,
                weaponStats.rarity
            );

        const armor =
            new Armor(
                armorType.value,
                armorMaterial.value,
                armorStats.defense,
                armorStats.durability,
                armorStats.enchantment,
                armorStats.rarity
            );

        const pet =
            new Pet(
                petName,
                petSpecies.value,
                petStats.buff,
                petStats.rarity,
                petStats.attack
            );

        const character =
            new Character(
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

        character.avatar =
            characterAvatar.src;

        characters.push(character);

        saveCharacters();

        renderCharacters(
            characters,
            characterList
        );

        showCharacterDetails(character);

        resetCreator();
    }
);

// RESET CREATOR

function resetCreator() {
    characterNameInput.value = "";

    characterClassSelect.selectedIndex = 0;

    document.querySelector("#characterAttack").value = "";
    document.querySelector("#characterDefense").value = "";
    document.querySelector("#characterMagic").value = "";
    document.querySelector("#characterGold").value = "";

    characterAvatar.src =
        defaultAvatar;

    randomizeAvatar.disabled = true;

    document.querySelector("#weaponType").selectedIndex = 0;
    document.querySelector("#weaponDamage").value = "";
    document.querySelector("#weaponDurability").value = "";
    document.querySelector("#weaponEnchantment").value = "";
    document.querySelector("#weaponRarity").selectedIndex = 0;

    document.querySelector("#armorType").selectedIndex = 0;
    document.querySelector("#armorMaterial").selectedIndex = 0;
    document.querySelector("#armorDefense").value = "";
    document.querySelector("#armorDurability").value = "";
    document.querySelector("#armorEnchantment").value = "";
    document.querySelector("#armorRarity").selectedIndex = 0;

    document.querySelector("#petName").value = "";
    document.querySelector("#petSpecies").selectedIndex = 0;
    document.querySelector("#petBuff").value = "";
    document.querySelector("#petAttack").value = "";
    document.querySelector("#petRarity").selectedIndex = 0;

    weaponStats = undefined;
    armorStats = undefined;
    petStats = undefined;

    characterPreviewName.textContent =
        "Your Character";

    characterPreviewClass.textContent =
        "Choose your class";

    weaponStep.classList.add("d-none");
    armorStep.classList.add("d-none");
    petStep.classList.add("d-none");

    characterStep.classList.remove("d-none");
}