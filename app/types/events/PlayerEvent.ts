import type { Player } from "../Player";
import type { Result } from "../Result";

export interface PlayerEvent {
    timestamp: number;
    eventType: "PLAYER_EVENT";
    playerEvtType: "JOIN" | "LEAVE";
    player: Player;
    result: Result;
}
