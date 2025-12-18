import { useGameContext } from "~/GameContext";
import WebSocketButton from "~/components/home/WebSocketButton";
import LogBoxButton from "~/components/home/LogBoxButton";
import SpriteSelector from "~/components/home/SpriteSelector";
import { Badge } from "~/components/ui/badge";

export default function Toolbar() {
    const { pkmnLvl, pkmnGen, turnNum } = useGameContext();
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
        </>
    );
}
