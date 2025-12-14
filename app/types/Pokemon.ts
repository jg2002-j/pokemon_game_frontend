import type { Move } from "./Move";
import type { Stats } from "./Stats";

export interface Pokemon {
    id: number;
    imgLink: string;
    criesLink: string;
    name: string;
    nature: string;
    types: string[];
    moves: Move[];
    currentStats: Stats;
    baseStats: Stats;
    currentAilment: string;
    fainted: boolean;
    currentHp: number;
}
