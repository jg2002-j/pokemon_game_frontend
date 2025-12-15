import type { Result } from "../Result";

export interface GameEvent {
    timestamp: string;
    eventType: "GAME_EVENT";
    gameEvtType: "LEVEL_CHANGE" | "GENERATION_CHANGE" | "TURN_CHANGE";
    newVal: number;
    result: Result;
}
