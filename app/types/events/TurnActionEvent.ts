import type { Player } from "../Player";
import type { Result } from "../Result";

type TurnActionEvtType = "HP_CHANGE" | "AILMENT_CHANGE" | "STATS_CHANGE" | "INFO_ONLY";

export interface TurnActionEvent {
    timestamp: string;
    eventType: "TURN_ACTION_EVENT";
    turnActionEvtTypes: TurnActionEvtType[];
    affectedPlayer: Player;
    result: Result;
}
