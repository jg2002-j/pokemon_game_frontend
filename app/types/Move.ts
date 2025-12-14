// Pokemon Move
export interface Move {
    id: number;
    name: string;
    accuracy: number | null;
    currentPp: number;
    basePp: number;
    power: number | null;
    type: string;
    damageClass: string;
}
