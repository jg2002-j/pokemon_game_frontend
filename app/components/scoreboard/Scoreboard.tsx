import { useEffect, useState } from "react";
import type { Player } from "~/types/Player";
import PlayerTile from "./PlayerTile";
import type { Generation } from "~/types/Generation";

interface ScoreboardProps {
    team1: Player[];
    team2: Player[];
    pkmnGen: Generation | undefined;
    showdownIcons: boolean;
}

export default function Scoreboard({ team1, team2 }: ScoreboardProps) {
    return (
        <>
            <h1 className="text-3xl font-bold">Scoreboard</h1>
            <div className="flex flex-col gap-5">
                <h2>TEAM ONE</h2>
                <div className="grid grid-cols-5 gap-5">
                    {team1?.map((p) => (
                        <PlayerTile key={p.username} p={p} />
                    ))}
                </div>
                <h2>TEAM TWO</h2>
                <div className="grid grid-cols-5 gap-5">
                    {team2?.map((p) => (
                        <PlayerTile key={p.username} p={p} />
                    ))}
                </div>
            </div>
        </>
    );
}
