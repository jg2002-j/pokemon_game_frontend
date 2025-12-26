import Toolbar from "~/components/home/Toolbar";
import Stats from "~/components/stats/Stats";
import Scoreboard from "~/components/ScoreboardSection";
import TurnPanel from "~/components/game/TurnPanel";

export default function Game() {
    return (
        <>
            <Toolbar />
            <div className="pt-20 p-5 min-h-screen flex flex-col gap-20">
                <TurnPanel />
                <Scoreboard />
                <Stats />
            </div>
        </>
    );
}
