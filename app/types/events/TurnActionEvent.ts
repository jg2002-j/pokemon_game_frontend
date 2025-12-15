import type { Player } from "../Player";
import type { Result } from "../Result";

type TurnActionEvtType = "HP_CHANGE" | "AILMENT_CHANGE" | "STATS_CHANGE" | "INFO_ONLY";

export interface TurnActionEvent {
    timestamp: string;
    eventTypes: TurnActionEvtType[];
    affectedPlayer: Player;
    result: Result;
}
