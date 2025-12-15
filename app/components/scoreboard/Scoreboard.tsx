import type { Player } from "~/types/Player";
import PlayerCard from "./PlayerCard";
import Stats from "./Stats";

interface ScoreboardProps {
    players: Player[];
    team1: Player[];
    team2: Player[];
}

export default function Scoreboard({ players, team1, team2 }: ScoreboardProps) {
    return (
        <>
            <h1 className="text-7xl font-tanklager font-bold">Scoreboard</h1>
            {players.length > 0 && <Stats />}
            <div className="flex flex-col gap-5">
                {team1.length > 0 && (
                    <>
                        <h2 className="font-tanklager text-5xl">TEAM ONE</h2>
                        <div className="grid grid-cols-5 gap-5">
                            {team1?.map((p) => (
                                <PlayerCard key={p.username} p={p} />
                            ))}
                        </div>
                    </>
                )}
                {team2.length > 0 && (
                    <>
                        <h2 className="font-tanklager text-5xl">TEAM TWO</h2>
                        <div className="grid grid-cols-5 gap-5">
                            {team2?.map((p) => (
                                <PlayerCard key={p.username} p={p} />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
