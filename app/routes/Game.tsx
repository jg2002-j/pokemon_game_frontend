import Toolbar from "~/components/home/Toolbar";
import Stats from "~/components/stats/Stats";
import Scoreboard from "~/components/ScoreboardSection";
import TurnBar from "~/components/game/TurnBar";

export default function Game() {
    return (
        <>
            <Toolbar />
            <div className="pt-20 p-5 min-h-screen flex flex-col gap-20">
                <TurnBar />
                <Scoreboard />
                <Stats />
            </div>
        </>
    );
}
