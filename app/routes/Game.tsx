import Toolbar from "~/components/home/Toolbar";
import Stats from "~/components/stats/Stats";
import Scoreboard from "~/components/ScoreboardSection";
import TurnPanel from "~/components/game/TurnPanel";
import { useGameContext } from "~/contexts/GameContext";
import GamePageClosed from "~/components/game/GamePageClosed";

export default function Game() {
    const { turnNum } = useGameContext();
    return (
        <>
            <Toolbar />
            <div className="pt-24 p-5 min-h-screen flex flex-col gap-20 justify-center">
                {turnNum === null || turnNum < 1 ? (
                    <GamePageClosed />
                ) : (
                    <>
                        <TurnPanel />
                        <Scoreboard />
                        <Stats />
                    </>
                )}
            </div>
        </>
    );
}
