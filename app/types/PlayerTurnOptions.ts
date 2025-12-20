import type { ActionType } from "./ActionType";

export interface PlayerTurnOption {
    username: string;
    options: ActionType[];
}
