import type { Result } from "../Result";

export interface GameEvent {
    timestamp: string;
    eventType: "LEVEL_CHANGE" | "GENERATION_CHANGE" | "TURN_CHANGE";
    newVal: number;
    result: Result;
}
