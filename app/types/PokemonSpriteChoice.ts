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
    animated: boolean;
}

export const PokemonSprites: Record<PokemonSpriteChoice, SpriteInfo> = {
    "Pokémon Showdown": {
        gen: 8,
        path: "other/showdown",
        animated: true,
    },
    "Red & Blue": {
        gen: 1,
        path: "versions/generation-i/red-blue/transparent",
        animated: false,
    },
    Yellow: {
        gen: 1,
        path: "versions/generation-i/yellow/transparent",
        animated: false,
    },
    Crystal: {
        gen: 2,
        path: "versions/generation-ii/crystal/transparent",
        animated: false,
    },
    Gold: {
        gen: 2,
        path: "versions/generation-ii/gold/transparent",
        animated: false,
    },
    Silver: {
        gen: 2,
        path: "versions/generation-ii/silver/transparent",
        animated: false,
    },
    Emerald: {
        gen: 3,
        path: "versions/generation-iii/emerald",
        animated: false,
    },
    "Ruby & Sapphire": {
        gen: 3,
        path: "versions/generation-iii/ruby-sapphire",
        animated: false,
    },
    "FireRed & LeafGreen": {
        gen: 3,
        path: "versions/generation-iii/firered-leafgreen",
        animated: false,
    },
    "Diamond & Pearl": {
        gen: 4,
        path: "versions/generation-iv/diamond-pearl",
        animated: false,
    },
    Platinum: {
        gen: 4,
        path: "versions/generation-iv/platinum",
        animated: false,
    },
    "HeartGold & SoulSilver": {
        gen: 4,
        path: "versions/generation-iv/heartgold-soulsilver",
        animated: false,
    },
    "Black & White": {
        gen: 5,
        path: "versions/generation-v/black-white",
        animated: false,
    },
    "Black & White (Animated)": {
        gen: 5,
        path: "versions/generation-v/black-white/animated",
        animated: true,
    },
    "Omega Ruby & Alpha Sapphire": {
        gen: 6,
        path: "versions/generation-vi/omegaruby-alphasapphire",
        animated: false,
    },
    "X & Y": {
        gen: 6,
        path: "versions/generation-vi/x-y",
        animated: false,
    },
    "Ultra Sun & Ultra Moon": {
        gen: 7,
        path: "versions/generation-vii/ultra-sun-ultra-moon",
        animated: false,
    },
    "Gen VIII Icons": {
        gen: 8,
        path: "versions/generation-viii/icons",
        animated: false,
    },
};
