import Toolbar from "~/components/home/Toolbar";
import GameSection from "~/components/game/TurnBar";
import Stats from "~/components/stats/Stats";
import Scoreboard from "~/components/ScoreboardSection";

export default function Game() {
    return (
        <>
            <Toolbar />
            <div className="p-5 flex flex-col gap-20 mt-20">
                <GameSection />
                <Scoreboard />
                <Stats />
            </div>
        </>
    );
}
