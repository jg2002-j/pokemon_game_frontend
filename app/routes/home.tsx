import type { Route } from "./+types/Home";
import { useWebSocket } from "~/contexts/WebSocketContext";
import ThemeButton from "~/components/home/ThemeButton";
import WebSocketButton from "~/components/home/WebSocketButton";
import GameSettings from "~/components/settings/GameSettings";

export function meta({}: Route.MetaArgs) {
    return [{ title: "Pokemon Game YAY" }, { name: "Pokemon Game", content: "Welcome to Pokemon Game!" }];
}

export default function Home() {
    const { connected } = useWebSocket();
    return (
        <div className="p-5 flex flex-col gap-5 border min-h-screen items-center justify-center">
            <div className="fixed top-5 left-5">
                <ThemeButton />
            </div>
            <h1 className="text-9xl font-tanklager">Game</h1>
            {connected ? <GameSettings /> : <WebSocketButton />}
        </div>
    );
}
