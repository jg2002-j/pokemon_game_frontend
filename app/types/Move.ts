import type { PokeType } from "./PokeType";

export interface Move {
    id: number;
    name: string;
    accuracy: number | null;
    currentPp: number;
    basePp: number;
    power: number | null;
    type: PokeType;
    damageClass: string;
}
