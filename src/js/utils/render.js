import {
    CharacterHelper,
    getRarityBadge,
} from "./helpers.js";

function renderCharacters(characters, characterList) {
    characterList.innerHTML = "";

    characters.forEach((character, index) => {
        characterList.innerHTML += `
        <div class="col-md-4">
            <div class="card shadow-sm h-100 border-0 rounded-4 overflow-hidden">
                <div class="text-center bg-light pt-4">
                    <img
                        src="${character.avatar}"
                        alt="${character.name}"
                        class="img-fluid rounded-4"
                        style="width: 180px; height: 180px; object-fit: contain;">
                </div>

                <div class="card-body text-center">
                    <h5 class="card-title mb-1">
                        ⚔️ ${character.name}
                        ${CharacterHelper.isLegendary(character) ? "⭐" : ""}
                    </h5>

                    <p class="text-body-secondary mb-4">
                        ${character.characterClass}
                    </p>

                    <div class="row g-2 mb-4">
                        <div class="col-4">
                            <div class="border rounded-3 p-2">
                                <div>⚔️</div>
                                <strong>${character.attack}</strong>
                                <small class="d-block text-body-secondary">Attack</small>
                            </div>
                        </div>

                        <div class="col-4">
                            <div class="border rounded-3 p-2">
                                <div>🛡️</div>
                                <strong>${character.defense}</strong>
                                <small class="d-block text-body-secondary">Defense</small>
                            </div>
                        </div>

                        <div class="col-4">
                            <div class="border rounded-3 p-2">
                                <div>✨</div>
                                <strong>${character.magic}</strong>
                                <small class="d-block text-body-secondary">Magic</small>
                            </div>
                        </div>
                    </div>

                    <button
                        class="btn btn-primary w-100 mb-2 view-details-btn"
                        data-index="${index}">
                        <i class="bi bi-eye"></i> View Details
                    </button>

                    <button
                        class="btn btn-outline-danger btn-sm w-100 delete-btn"
                        data-index="${index}">
                        <i class="bi bi-trash"></i> Delete
                    </button>
                </div>
            </div>
        </div>
        `;
    });

    document.querySelectorAll(".view-details-btn").forEach(button => {
        button.addEventListener("click", function () {
            const index = Number(this.dataset.index);
            const character = characters[index];

            document.dispatchEvent(
                new CustomEvent("showCharacterDetails", {
                    detail: character,
                })
            );
        });
    });

    document.querySelectorAll(".delete-btn").forEach(button => {
        button.addEventListener("click", function () {
            const index = Number(this.dataset.index);

            characters.splice(index, 1);

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
                "characters",
                JSON.stringify(charactersToSave)
            );

            renderCharacters(characters, characterList);
        });
    });
}

export default renderCharacters;