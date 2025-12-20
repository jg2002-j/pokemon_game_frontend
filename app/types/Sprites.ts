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
    baseSize: number;
}

export const PokemonSprites: Record<PokemonSpriteChoice, SpriteInfo> = {
    "Pokémon Showdown": {
        gen: 0,
        path: "other/showdown",
        animated: true,
        baseSize: 0,
    },
    "Red & Blue": {
        gen: 1,
        path: "versions/generation-i/red-blue/transparent",
        animated: false,
        baseSize: 0,
    },
    Yellow: {
        gen: 1,
        path: "versions/generation-i/yellow/transparent",
        animated: false,
        baseSize: 0,
    },
    Crystal: {
        gen: 2,
        path: "versions/generation-ii/crystal/transparent",
        animated: false,
        baseSize: 0,
    },
    Gold: {
        gen: 2,
        path: "versions/generation-ii/gold/transparent",
        animated: false,
        baseSize: 0,
    },
    Silver: {
        gen: 2,
        path: "versions/generation-ii/silver/transparent",
        animated: false,
        baseSize: 0,
    },
    Emerald: {
        gen: 3,
        path: "versions/generation-iii/emerald",
        animated: false,
        baseSize: 0,
    },
    "Ruby & Sapphire": {
        gen: 3,
        path: "versions/generation-iii/ruby-sapphire",
        animated: false,
        baseSize: 0,
    },
    "FireRed & LeafGreen": {
        gen: 3,
        path: "versions/generation-iii/firered-leafgreen",
        animated: false,
        baseSize: 0,
    },
    "Diamond & Pearl": {
        gen: 4,
        path: "versions/generation-iv/diamond-pearl",
        animated: false,
        baseSize: 0,
    },
    Platinum: {
        gen: 4,
        path: "versions/generation-iv/platinum",
        animated: false,
        baseSize: 0,
    },
    "HeartGold & SoulSilver": {
        gen: 4,
        path: "versions/generation-iv/heartgold-soulsilver",
        animated: false,
        baseSize: 0,
    },
    "Black & White": {
        gen: 0,
        path: "versions/generation-v/black-white",
        animated: false,
        baseSize: 0,
    },
    "Black & White (Animated)": {
        gen: 5,
        path: "versions/generation-v/black-white/animated",
        animated: true,
        baseSize: 0,
    },
    "Omega Ruby & Alpha Sapphire": {
        gen: 6,
        path: "versions/generation-vi/omegaruby-alphasapphire",
        animated: false,
        baseSize: 0,
    },
    "X & Y": {
        gen: 6,
        path: "versions/generation-vi/x-y",
        animated: false,
        baseSize: 0,
    },
    "Ultra Sun & Ultra Moon": {
        gen: 7,
        path: "versions/generation-vii/ultra-sun-ultra-moon",
        animated: false,
        baseSize: 0,
    },
    "Gen VIII Icons": {
        gen: 8,
        path: "versions/generation-viii/icons",
        animated: false,
        baseSize: 0,
    },
};
