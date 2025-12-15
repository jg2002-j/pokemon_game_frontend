import type { Move } from "./Move";
import type { PokeType } from "./PokeType";
import type { Stats } from "./Stats";

export interface Pokemon {
    id: number;
    spriteLink: string;
    criesLink: string;
    name: string;
    nature: string;
    types: PokeType[];
    moves: Move[];
    currentStats: Stats;
    baseStats: Stats;
    currentAilment: string;
    fainted: boolean;
    currentHp: number;
}
