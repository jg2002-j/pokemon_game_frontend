import type { ActionType } from "./ActionType";
import type { Player } from "./Player";

export interface GameState {
    pkmnGen: string;
    pkmnLvl: number;
    turnNum: number;
    players: Record<string, Player>;
    playerTurnOptions: Record<string, ActionType[]>;
}
