import { useState } from "react";

import PlayerActionPanel from "./PlayerActionPanel";
import type { Player } from "~/types/Player";
import type { PlayerTurnOption } from "~/types/PlayerTurnOptions";

interface GamePanelProps {
    players: Player[];
    playerOpts: PlayerTurnOption[];
}

function GamePanel({ players, playerOpts }: GamePanelProps) {
    return (
        <>
            <h1 className="text-7xl font-tanklager font-bold">Game</h1>
            <div className="flex flex-col gap-5">
                <h2 className="font-tanklager text-5xl mb-5">Take Turn</h2>
                <div className="flex flex-col gap-5">
                    <div className="grid grid-cols-5 gap-5">
                        {players?.map((p) => (
                            <PlayerActionPanel
                                player={p}
                                options={playerOpts.find((opt) => opt.username === p.username)?.options}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default GamePanel;
