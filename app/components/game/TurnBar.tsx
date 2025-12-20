import PlayerActionCard from "./PlayerActionCard";
import { useGameContext } from "~/contexts/GameContext";

export default function TurnBar() {
    const { players, playerTurnOpts } = useGameContext();
    return (
        <>
            <h1 className="text-7xl font-tanklager font-bold">Game</h1>
            <div className="flex flex-col gap-5">
                <h2 className="font-tanklager text-5xl mb-5">Take Turn</h2>
                <div className="flex flex-col gap-5">
                    <div className="grid grid-cols-5 gap-5">
                        {players?.map((p) => (
                            <div key={p.username}>
                                <PlayerActionCard
                                    player={p}
                                    options={playerTurnOpts.find((opt) => opt.username === p.username)?.options}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
