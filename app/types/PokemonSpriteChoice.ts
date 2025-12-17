export const PokemonSpriteChoices = [
    "Pokémon Showdown",
    "Red & Blue",
    "Yellow",
    "Crystal",
    "Gold",
    "Silver",
    "Emerald",
    "Ruby & Sapphire",
    "FireRed & LeafGreen",
    "Diamond & Pearl",
    "Platinum",
    "HeartGold & SoulSilver",
    "Black & White",
    "Black & White (Animated)",
    "Omega Ruby & Alpha Sapphire",
    "X & Y",
    "Ultra Sun & Ultra Moon",
    "Gen VIII Icons",
] as const;

export type PokemonSpriteChoice = (typeof PokemonSpriteChoices)[number];

interface SpriteInfo {
    gen: number;
    path: string;
}

export const PokemonSprites: Record<PokemonSpriteChoice, SpriteInfo> = {
    "Pokémon Showdown": { gen: 8, path: "other/showdown" },
    "Red & Blue": { gen: 1, path: "versions/generation-i/red-blue/transparent" },
    Yellow: { gen: 1, path: "versions/generation-i/yellow/transparent" },
    Crystal: { gen: 2, path: "versions/generation-ii/crystal/transparent" },
    Gold: { gen: 2, path: "versions/generation-ii/gold/transparent" },
    Silver: { gen: 2, path: "versions/generation-ii/silver/transparent" },
    Emerald: { gen: 3, path: "versions/generation-iii/emerald" },
    "Ruby & Sapphire": { gen: 3, path: "versions/generation-iii/ruby-sapphire" },
    "FireRed & LeafGreen": { gen: 3, path: "versions/generation-iii/firered-leafgreen" },
    "Diamond & Pearl": { gen: 4, path: "versions/generation-iv/diamond-pearl" },
    Platinum: { gen: 4, path: "versions/generation-iv/platinum" },
    "HeartGold & SoulSilver": { gen: 4, path: "versions/generation-iv/heartgold-soulsilver" },
    "Black & White": { gen: 5, path: "versions/generation-v/black-white" },
    "Black & White (Animated)": { gen: 5, path: "versions/generation-v/black-white/animated" },
    "Omega Ruby & Alpha Sapphire": { gen: 6, path: "versions/generation-vi/omegaruby-alphasapphire" },
    "X & Y": { gen: 6, path: "versions/generation-vi/x-y" },
    "Ultra Sun & Ultra Moon": { gen: 7, path: "versions/generation-vii/ultra-sun-ultra-moon" },
    "Gen VIII Icons": { gen: 8, path: "versions/generation-viii/icons" },
};
