import type { ActionType } from "./events/ActionType";

export interface PlayerTurnOption {
    username: string;
    options: ActionType[];
}
