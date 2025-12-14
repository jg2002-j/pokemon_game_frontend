import { useState, useRef, useEffect, useMemo } from "react";
import type { Route } from "./+types/home";
import Scoreboard from "~/components/scoreboard/Scoreboard";
import type { LogMessage } from "~/types/LogMessage";
import type { GameEvent } from "~/types/events/GameEvent";
import LogBox from "~/components/log/LogBox";
import { Button } from "~/components/ui/button";
import { RefreshCcw, Unplug } from "lucide-react";
import type { Player } from "~/types/Player";

export function meta({}: Route.MetaArgs) {
    return [{ title: "Pokemon Game YAY" }, { name: "Pokemon Game", content: "Welcome to Pokemon Game!" }];
}

export default function Home() {
    const [messages, setMessages] = useState<LogMessage[]>([]);
    const [gameEvents, setGameEvents] = useState<GameEvent[]>([]);

    const websocketRef = useRef<WebSocket | null>(null);

    function connect() {
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

    async function refresh() {
        try {
            const response = await fetch("/state/current");
            if (!response.ok) {
                console.error(`HTTP error! status: ${response.status}`);
            }

            const players: Player[] = await response.json();

            const joinEvents: GameEvent[] = players.map((player) => ({
                timestamp: Date.now(),
                player,
                eventType: "JOIN",
                result: {
                    success: true,
                    message: `Fetched ${player.username}.`,
                },
            }));

            setGameEvents(joinEvents);
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

        return { team1: t1, team2: t2 };
    }, [gameEvents]);

    useEffect(() => {
        return () => {
            websocketRef.current?.close();
            websocketRef.current = null;
        };
    }, []);

    return (
        <div className="border-2 rounded m-3 p-5 flex flex-col gap-5">
            <div className="flex gap-2">
                <Button onClick={connect}>
                    <Unplug /> Connect Websocket
                </Button>
                <Button onClick={refresh}>
                    <RefreshCcw /> Manual Fetch
                </Button>
            </div>
            <Scoreboard team1={team1} team2={team2} />
            <LogBox msgs={messages} />
        </div>
    );
}
