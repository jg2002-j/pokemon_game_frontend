import type { Result } from "../Result";

type ActionType = "SWITCH" | "HEAL" | "WAIT" | "ATTACK" | "NONE";

export interface TurnInfoEvent {
    timestamp: string;
    playerActionOptions: Map<string, ActionType[]>;
    result: Result;
}
