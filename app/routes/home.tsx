import type { Route } from "./+types/home";

import Toolbar from "~/components/home/Toolbar";
import GameSection from "~/components/game/TurnBar";
import Stats from "~/components/stats/Stats";
import Scoreboard from "~/components/ScoreboardSection";

export function meta({}: Route.MetaArgs) {
    return [{ title: "Pokemon Game YAY" }, { name: "Pokemon Game", content: "Welcome to Pokemon Game!" }];
}

export default function Home() {
    return (
        <>
            <Toolbar />
            <div className="p-5 flex flex-col gap-10 pt-24">
                <GameSection />
                <Stats />
                <Scoreboard />
            </div>
        </>
    );
}
