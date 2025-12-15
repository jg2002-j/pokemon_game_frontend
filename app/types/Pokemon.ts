import type { ImgLinks } from "./ImgLinks";
import type { Move } from "./Move";
import type { Stats } from "./Stats";

export interface Pokemon {
    id: number;
    imgLinks: ImgLinks;
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
