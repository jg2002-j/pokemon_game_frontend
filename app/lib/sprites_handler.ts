import { useGameContext } from "~/GameContext";

const iconGenMap: Record<PokemonSpriteChoice, number> = {
    "Pokémon Showdown": 1,
    "Red & Blue": 1,
    Yellow: 1,
    Crystal: 2,
    Gold: 2,
    Silver: 2,
    Emerald: 3,
    "Ruby & Sapphire": 3,
    "FireRed & LeafGreen": 3,
    "Diamond & Pearl": 4,
    Platinum: 4,
    "HeartGold & SoulSilver": 4,
    "Black & White": 5,
    "Black & White (Animated)": 5,
    "Omega Ruby & Alpha Sapphire": 6,
    "X & Y": 6,
    "Ultra Sun & Ultra Moon": 7,
    "Gen VIII Icons": 8,
};

const iconPathMap: Record<PokemonSpriteChoice, string> = {
    "Pokémon Showdown": "other/showdown",
    "Red & Blue": "versions/generation-i/red-blue/transparent",
    Yellow: "versions/generation-i/yellow/transparent",
    Crystal: "versions/generation-ii/crystal/transparent",
    Gold: "versions/generation-ii/gold/transparent",
    Silver: "versions/generation-ii/silver/transparent",
    Emerald: "versions/generation-iii/emerald",
    "Ruby & Sapphire": "versions/generation-iii/ruby-sapphire",
    "FireRed & LeafGreen": "versions/generation-iii/firered-leafgreen",
    "Diamond & Pearl": "versions/generation-iv/diamond-pearl",
    Platinum: "versions/generation-iv/platinum",
    "HeartGold & SoulSilver": "versions/generation-iv/heartgold-soulsilver",
    "Black & White": "versions/generation-v/black-white",
    "Black & White (Animated)": "versions/generation-v/black-white/animated",
    "Omega Ruby & Alpha Sapphire": "versions/generation-vi/omegaruby-alphasapphire",
    "X & Y": "versions/generation-vi/x-y",
    "Ultra Sun & Ultra Moon": "versions/generation-vii/ultra-sun-ultra-moon",
    "Gen VIII Icons": "versions/generation-viii/icons",
};

export const getSpriteLink = (pkmnId: number): string => {
    const { spriteChoice, pkmnGen } = useGameContext();
    const requestedGen = iconGenMap[spriteChoice];
    if (pkmnGen === undefined || requestedGen > pkmnGen.numericalVal) {
        return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pkmnId}.png`;
    } else {
        const path = iconPathMap[spriteChoice];
        const extension =
            spriteChoice === "Black & White (Animated)" || spriteChoice === "Pokémon Showdown" ? "gif" : "png";
        return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${path}/${pkmnId}.${extension}`;
    }
};
