import { useGameContext } from "~/contexts/GameContext";
import WebSocketButton from "~/components/home/WebSocketButton";
import LogBoxButton from "~/components/home/LogBoxButton";
import SpriteSelector from "~/components/home/SpriteSelector";
import { Badge } from "~/components/ui/badge";
import ThemeButton from "./ThemeButton";

export default function Toolbar() {
    const { pkmnLvl, pkmnGen, turnNum } = useGameContext();
    return (
        <>
            <div className="fixed top-0 w-full p-5 flex justify-between items-center gap-5">
                <div className="flex gap-5">
                    <ThemeButton />
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
                        <Badge>{pkmnGen?.slug.toUpperCase()}</Badge>
                    </div>
                    <SpriteSelector />
                </div>
            </div>
        </>
    );
}
