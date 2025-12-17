import type { Route } from "./+types/home";

import WebSocketButton from "~/components/home/WebSocketButton";
import LogBoxButton from "~/components/home/LogBoxButton";

import PreGameSection from "~/components/PreGameSection";
import GameSection from "~/components/GameSection";
import Scoreboard from "~/components/ScoreboardSection";

import { Badge } from "~/components/ui/badge";

import { useGameContext } from "~/GameContext";
import SpriteSelector from "~/components/home/SpriteSelector";

export function meta({}: Route.MetaArgs) {
    return [{ title: "Pokemon Game YAY" }, { name: "Pokemon Game", content: "Welcome to Pokemon Game!" }];
}

export default function Home() {
    const { pkmnLvl, pkmnGen, turnNum } = useGameContext();
    const started = turnNum != null && turnNum > 0;

    return (
        <>
            <div className="fixed w-full p-5 flex justify-between items-center gap-5">
                <div className="flex gap-5">
                    <WebSocketButton />
                    <LogBoxButton />
                </div>
                <div className="flex gap-5 select-none">
                    <div className="flex items-center gap-2">
                        <span className="font-bold text-lg">Turn</span>
                        <Badge>{turnNum}</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="font-bold text-lg">Level</span>
                        <Badge>{pkmnLvl}</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="font-bold text-lg">Generation</span>
                        <Badge>{pkmnGen?.name.toUpperCase()}</Badge>
                    </div>
                    <SpriteSelector />
                </div>
            </div>
            <div className="p-5 flex flex-col gap-10 pt-24">
                {!started && <PreGameSection />}
                {started && (
                    <>
                        <GameSection />
                        <Scoreboard />
                    </>
                )}
            </div>
        </>
    );
}
