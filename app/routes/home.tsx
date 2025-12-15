import { useState, useRef, useEffect, useMemo, useContext } from "react";
import type { Route } from "./+types/home";
import Scoreboard from "~/components/scoreboard/Scoreboard";
import type { LogMessage } from "~/types/LogMessage";
import type { GameEvent } from "~/types/events/GameEvent";
import LogBox from "~/components/log/LogBox";
import { Button } from "~/components/ui/button";
import { RefreshCcw, Unplug } from "lucide-react";
import type { Player } from "~/types/Player";
import type { GameState } from "~/types/GameState";

export function meta({}: Route.MetaArgs) {
    return [{ title: "Pokemon Game YAY" }, { name: "Pokemon Game", content: "Welcome to Pokemon Game!" }];
}

export default function Home() {
    const [pkmnLvl, setPkmnLvl] = useState<number | null>(null);
    const [pkmnGen, setPkmnGen] = useState<string | null>(null);
    const [showdownIcons, setShowdownIcons] = useState<boolean>(false);
    const [messages, setMessages] = useState<LogMessage[]>([]);
    const [gameEvents, setGameEvents] = useState<GameEvent[]>([]);

    const websocketRef = useRef<WebSocket | null>(null);

    function connectWebSocket() {
        if (websocketRef.current && websocketRef.current.readyState === WebSocket.OPEN) {
            log("Already connected!");
            return;
        }

        const ws = new WebSocket("ws://localhost:8080/scoreboard");
        websocketRef.current = ws;

        ws.onopen = () => log("Connected!");
        ws.onmessage = (event: MessageEvent) => {
            try {
                const data: GameEvent = JSON.parse(event.data);
                setGameEvents((prev) => [...prev.slice(-500), data]);
                log(data.result.message);
            } catch (err) {
                console.error("Failed to parse message", err);
            }
        };
        ws.onclose = () => log("Disconnected");
        ws.onerror = (event) => {
            console.error(event);
            log("WebSocket error occurred");
        };
    }

    async function manualFetch() {
        try {
            const response = await fetch("/game/currentState");
            if (!response.ok) {
                console.error(`HTTP error! status: ${response.status}`);
            }

            const gameState: GameState = await response.json();
            console.log(gameState);
            setPkmnLvl(gameState.pokemonLevel);
            setPkmnGen(gameState.pokemonGen);
            setShowdownIcons(gameState.useShowdownIcons);

            if (gameState.allPlayers.length > 0) {
                const joinEvents: GameEvent[] = gameState.allPlayers.map((player) => ({
                    timestamp: Date.now(),
                    player,
                    eventType: "JOIN",
                    result: {
                        success: true,
                        message: `Fetched ${player.username}.`,
                    },
                }));
                setGameEvents(joinEvents);
            }
        } catch (err: any) {
            console.error(err.message || "Something went wrong");
        }
    }

    function log(msg: string) {
        const timestamp = new Date().toLocaleTimeString();
        const logEntry: LogMessage = { timestamp, message: msg };
        setMessages((prev) => [...prev, logEntry]);
    }

    const { team1, team2 } = useMemo(() => {
        const t1: Player[] = [];
        const t2: Player[] = [];

        gameEvents.forEach(({ player, eventType }) => {
            const team = player.teamNum === 1 ? t1 : t2;

            if (eventType === "JOIN") {
                if (!team.some((p) => p.username === player.username)) {
                    team.push(player);
                }
            }

            if (eventType === "LEAVE") {
                const index = team.findIndex((p) => p.username === player.username);
                if (index !== -1) team.splice(index, 1);
            }
        });

        const sortByUsername = (a: Player, b: Player) =>
            a.username.localeCompare(b.username, undefined, { sensitivity: "base" });

        t1.sort(sortByUsername);
        t2.sort(sortByUsername);

        return { team1: t1, team2: t2 };
    }, [gameEvents]);

    useEffect(() => {
        return () => {
            websocketRef.current?.close();
            websocketRef.current = null;
        };
    }, []);

    return (
        <div className="p-5 flex flex-col gap-5">
            <div className="flex gap-2">
                <Button onClick={connectWebSocket}>
                    <Unplug /> Connect Websocket
                </Button>
                <Button onClick={manualFetch}>
                    <RefreshCcw /> Manual Fetch
                </Button>
            </div>
            <div className="flex gap-2">
                <h2>Level {pkmnLvl}</h2>
                <h2>Generation {pkmnGen}</h2>
            </div>
            <Scoreboard team1={team1} team2={team2} pkmnGen={pkmnGen} showdownIcons={showdownIcons} />
            <LogBox msgs={messages} />
        </div>
    );
}
