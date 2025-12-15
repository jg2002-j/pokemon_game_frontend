import { useEffect, useState } from "react";
import type { Player } from "~/types/Player";
import PlayerTile from "./PlayerTile";
import type { ImgLinks } from "~/types/ImgLinks";

interface ScoreboardProps {
    team1: Player[];
    team2: Player[];
    pkmnGen: string | null;
    showdownIcons: boolean;
}

export default function Scoreboard({ team1, team2, pkmnGen, showdownIcons }: ScoreboardProps) {
    const getIconString = () => {
        if (showdownIcons) {
            return "showdown";
        } else if (pkmnGen != null) {
            return pkmnGen.toLowerCase() as keyof ImgLinks;
        } else {
            return "fallback";
        }
    };
    const iconKey = getIconString();

    return (
        <>
            <h1 className="text-3xl font-bold">Scoreboard</h1>
            <div className="flex flex-col gap-5">
                <h2>TEAM ONE</h2>
                <div className="grid grid-cols-5 gap-5">
                    {team1?.map((p) => (
                        <PlayerTile key={p.username} p={p} icon={iconKey} />
                    ))}
                </div>
                <h2>TEAM TWO</h2>
                <div className="grid grid-cols-5 gap-5">
                    {team2?.map((p) => (
                        <PlayerTile key={p.username} p={p} icon={iconKey} />
                    ))}
                </div>
            </div>
        </>
    );
}
