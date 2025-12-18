import { useGameContext } from "~/contexts/GameContext";

import PlayerCard from "./scoreboard/PlayerCard";

export default function ScoreboardSection() {
    const { players, team1, team2 } = useGameContext();

    return (
        <>
            <h1 className="text-7xl font-tanklager font-bold">Scoreboard</h1>
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
