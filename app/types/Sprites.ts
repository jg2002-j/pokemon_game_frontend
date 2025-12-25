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
] as const;

export type PokemonSpriteChoice = (typeof PokemonSpriteChoices)[number];

interface SpriteInfo {
    gen: number;
    path: string;
    backPath: string | null;
    animated: boolean;
    defaultScale: string;
}

export const PokemonSprites: Record<PokemonSpriteChoice, SpriteInfo> = {
    "Pokémon Showdown": {
        gen: 0,
        path: "other/showdown",
        backPath: "other/showdown/back",
        animated: true,
        defaultScale: "scale-100",
    },
    "Red & Blue": {
        gen: 1,
        path: "versions/generation-i/red-blue/transparent",
        backPath: "versions/generation-i/red-blue/transparent/back",
        animated: false,
        defaultScale: "scale-170",
    },
    Yellow: {
        gen: 1,
        path: "versions/generation-i/yellow/transparent",
        backPath: "versions/generation-i/yellow/transparent/back",
        animated: false,
        defaultScale: "scale-180",
    },
    Crystal: {
        gen: 2,
        path: "versions/generation-ii/crystal/transparent",
        backPath: "versions/generation-ii/crystal/transparent/back",
        animated: false,
        defaultScale: "scale-170",
    },
    Gold: {
        gen: 2,
        path: "versions/generation-ii/gold/transparent",
        backPath: "versions/generation-ii/gold/back",
        animated: false,
        defaultScale: "scale-140",
    },
    Silver: {
        gen: 2,
        path: "versions/generation-ii/silver/transparent",
        backPath: "versions/generation-ii/silver/back",
        animated: false,
        defaultScale: "scale-140",
    },
    Emerald: {
        gen: 3,
        path: "versions/generation-iii/emerald",
        backPath: "versions/generation-iii/ruby-sapphire/back",
        animated: false,
        defaultScale: "scale-100",
    },
    "Ruby & Sapphire": {
        gen: 3,
        path: "versions/generation-iii/ruby-sapphire",
        backPath: "versions/generation-iii/ruby-sapphire/back",
        animated: false,
        defaultScale: "scale-100",
    },
    "FireRed & LeafGreen": {
        gen: 3,
        path: "versions/generation-iii/firered-leafgreen",
        backPath: "versions/generation-iii/firered-leafgreen/back",
        animated: false,
        defaultScale: "scale-100",
    },
    "Diamond & Pearl": {
        gen: 4,
        path: "versions/generation-iv/diamond-pearl",
        backPath: "versions/generation-iv/diamond-pearl/back",
        animated: false,
        defaultScale: "scale-110",
    },
    Platinum: {
        gen: 4,
        path: "versions/generation-iv/platinum",
        backPath: "versions/generation-iv/platinum/back",
        animated: false,
        defaultScale: "scale-110",
    },
    "HeartGold & SoulSilver": {
        gen: 4,
        path: "versions/generation-iv/heartgold-soulsilver",
        backPath: "versions/generation-iv/heartgold-soulsilver/back",
        animated: false,
        defaultScale: "scale-110",
    },
    "Black & White": {
        gen: 0,
        path: "versions/generation-v/black-white",
        backPath: "versions/generation-v/black-white/back",
        animated: false,
        defaultScale: "scale-120",
    },
    "Black & White (Animated)": {
        gen: 5,
        path: "versions/generation-v/black-white/animated",
        backPath: "versions/generation-v/black-white/animated/back",
        animated: true,
        defaultScale: "scale-100",
    },
    "Omega Ruby & Alpha Sapphire": {
        gen: 6,
        path: "versions/generation-vi/omegaruby-alphasapphire",
        backPath: null,
        animated: false,
        defaultScale: "scale-110",
    },
    "X & Y": {
        gen: 6,
        path: "versions/generation-vi/x-y",
        backPath: null,
        animated: false,
        defaultScale: "scale-100",
    },
    "Ultra Sun & Ultra Moon": {
        gen: 7,
        path: "versions/generation-vii/ultra-sun-ultra-moon",
        backPath: null,
        animated: false,
        defaultScale: "scale-120",
    },
};
