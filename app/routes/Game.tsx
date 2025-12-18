import GameSection from "~/components/game/TurnBar";
import Stats from "~/components/stats/Stats";
import Scoreboard from "~/components/ScoreboardSection";

export default function Game() {
    return (
        <div className="p-5 flex flex-col gap-10 pt-24">
            <GameSection />
            <Stats />
            <Scoreboard />
        </div>
    );
}
