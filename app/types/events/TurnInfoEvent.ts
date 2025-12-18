import type { Result } from "~/types/Result";
import type { ActionType } from "./ActionType";

export interface TurnInfoEvent {
    timestamp: string;
    eventType: "TURN_INFO_EVENT";
    playerActionOptions: Record<string, ActionType[]>;
    result: Result;
}
