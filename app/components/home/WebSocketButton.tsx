import { useEffect, useRef, useState } from "react";
import { useGameContext } from "~/GameContext";

import { CircleCheck, Unplug } from "lucide-react";

import { Button } from "~/components/ui/button";

import {
    handleGameEvent,
    handlePlayerEvent,
    handleTurnActionEvent,
    handleTurnInfoEvent,
} from "../../lib/events_handler";

import { toast } from "sonner";
import type { GameEvent } from "~/types/events/GameEvent";
import type { PlayerEvent } from "~/types/events/PlayerEvent";
import type { TurnActionEvent } from "~/types/events/TurnActionEvent";
import type { TurnInfoEvent } from "~/types/events/TurnInfoEvent";

function WebSocketButton() {
    const { logMsg } = useGameContext();
    type AnyEvent = GameEvent | PlayerEvent | TurnActionEvent | TurnInfoEvent;

    const [connected, setConnected] = useState<boolean>(false);
    const websocketRef = useRef<WebSocket | null>(null);

    const connectWebSocket = () => {
        if (websocketRef.current && websocketRef.current.readyState === WebSocket.OPEN) {
            logMsg("Already connected to server!");
            return;
        }

        const ws = new WebSocket("ws://localhost:8080/scoreboard");
        websocketRef.current = ws;

        ws.onopen = () => {
            logMsg("Connected to server!");
            toast.success("Connected to server!");
            setConnected(true);
        };
        ws.onmessage = (event: MessageEvent) => handleWsMessage(event);
        ws.onclose = () => {
            logMsg("Disconnected from server!");
            toast.warning("Disconnected from server!");
            setConnected(false);
        };
        ws.onerror = (event) => console.error(event);
    };

    const handleWsMessage = (event: MessageEvent) => {
        const data = JSON.parse(event.data) as unknown;
        if (!isEvent(data)) {
            console.error("Invalid event payload", data);
            toast.warning("Received malformed payload from server.");
            return;
        }
        handleEvent(data);
    };

    const isEvent = (data: any): data is AnyEvent => {
        return data && typeof data === "object" && typeof data.eventType === "string";
    };

    const handleEvent = (evt: AnyEvent) => {
        switch (evt.eventType) {
            case "GAME_EVENT":
                handleGameEvent(evt);
                break;
            case "PLAYER_EVENT":
                handlePlayerEvent(evt);
                break;
            case "TURN_ACTION_EVENT":
                handleTurnActionEvent(evt);
                break;
            case "TURN_INFO_EVENT":
                handleTurnInfoEvent(evt);
                break;
            default:
                console.log("Unhandled event type");
        }
    };

    useEffect(() => {
        return () => {
            websocketRef.current?.close();
            websocketRef.current = null;
        };
    }, []);

    return (
        <div>
            {connected ? (
                <Button className="bg-green-400/60">
                    <CircleCheck /> Connected
                </Button>
            ) : (
                <Button onClick={connectWebSocket}>
                    <Unplug /> Connect Websocket
                </Button>
            )}
        </div>
    );
}

export default WebSocketButton;
