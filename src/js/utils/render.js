import {
    CharacterHelper,
    getRarityBadge,
} from "./helpers.js";

function renderCharacters(characters, characterList) {
    characterList.innerHTML = "";

    characters.forEach((character, index) => {
        characterList.innerHTML += `
        <div class="col-md-4">
            <div class="card shadow-sm h-100">
                <div class="card-body">

                    <h5 class="card-title">
                        ⚔️ ${character.name}
                        ${CharacterHelper.isLegendary(character) ? "⭐" : ""}
                    </h5>

                    <p><strong>Class:</strong> ${character.characterClass}</p>
                    <p><strong>Attack:</strong> ${character.attack}</p>
                    <p><strong>Defense:</strong> ${character.defense}</p>
                    <p><strong>Magic:</strong> ${character.magic}</p>

                    <p><strong>Weapon:</strong> ${character.weapon.type}</p>
                    <p><strong>Enchantment:</strong> ${character.weapon.enchantment}</p>
                    <p><strong>Rarity:</strong> ${getRarityBadge(character.weapon.rarity)}</p>

                    <button
                        class="btn btn-outline-danger btn-sm mt-3 w-100 delete-btn"
                        data-index="${index}">
                        <i class="bi bi-trash"></i> Delete
                    </button>

                </div>
            </div>
        </div>
        `;
    });

    document.querySelectorAll(".delete-btn").forEach(button => {
        button.addEventListener("click", function () {
            const index = Number(this.dataset.index);

            characters.splice(index, 1);

            renderCharacters(characters, characterList);
        });
    });
}

export default renderCharacters;