import type { GameState } from "./GameState";
import type { Result } from "./Result";

export interface WsMessage {
    version: number;
    type: "STATE_UPDATE" | "ERROR";
    payload: GameState;
    result: Result;
}
