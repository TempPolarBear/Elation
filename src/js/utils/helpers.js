class CharacterHelper {
    static isLegendary(character) {
        return character.weapon.rarity === "Legendary" ||
               character.weapon.rarity === "Mythical";
    }
}

function getRarityBadge(rarity) {
    switch (rarity) {
        case "Common":
            return `<span class="badge bg-secondary">⚪ Common</span>`;

        case "Uncommon":
            return `<span class="badge bg-success">🟢 Uncommon</span>`;

        case "Rare":
            return `<span class="badge bg-primary">🔵 Rare</span>`;

        case "Epic":
            return `<span class="badge bg-dark">🟣 Epic</span>`;

        case "Legendary":
            return `<span class="badge bg-warning text-dark">⭐ Legendary</span>`;

        case "Mythical":
            return `<span class="badge bg-danger">🔥 Mythical</span>`;

        default:
            return rarity;
    }
}

export {
    CharacterHelper,
    getRarityBadge,
};