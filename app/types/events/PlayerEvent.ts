import type { Player } from "../Player";
import type { Result } from "../Result";

export interface PlayerEvent {
    timestamp: number;
    player: Player;
    eventType: "JOIN" | "LEAVE";
    result: Result;
}
