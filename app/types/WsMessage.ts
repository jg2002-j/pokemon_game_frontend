import type { GameState } from "./GameState";

export interface WsMessage {
    version: number;
    type: "STATE_UPDATE" | "ERROR";
    payload: GameState;
    logMsgs: string[];
}
