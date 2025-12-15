import { Unplug } from "lucide-react";
import { useEffect, useRef } from "react";
import { Button } from "~/components/ui/button";
import type { GameEvent } from "~/types/events/GameEvent";
import type { PlayerEvent } from "~/types/events/PlayerEvent";
import type { TurnActionEvent } from "~/types/events/TurnActionEvent";
import type { TurnInfoEvent } from "~/types/events/TurnInfoEvent";
import type { PlayerTurnOption } from "~/types/PlayerTurnOptions";
import { handleGameEvent, handlePlayerEvent, handleTurnActionEvent, handleTurnInfoEvent } from "./HandleEvents";
import type { Player } from "~/types/Player";
import type { Generation } from "~/types/Generation";

interface WsBtnProps {
    logMsg: (msg: string) => void;
    setPkmnLvl: React.Dispatch<React.SetStateAction<number | null>>;
    setPkmnGen: React.Dispatch<React.SetStateAction<Generation | undefined>>;
    setShowdownIcons: React.Dispatch<React.SetStateAction<boolean>>;
    players: Player[];
    setPlayers: React.Dispatch<React.SetStateAction<Player[]>>;
    setPlayerTurnOpts: React.Dispatch<React.SetStateAction<PlayerTurnOption[]>>;
    setTurnNum: React.Dispatch<React.SetStateAction<number | null>>;
}

function WebSocketButton({
    logMsg,
    setPkmnLvl,
    setPkmnGen,
    setShowdownIcons,
    players,
    setPlayers,
    setPlayerTurnOpts,
    setTurnNum,
}: WsBtnProps) {
    type AnyEvent = GameEvent | PlayerEvent | TurnActionEvent | TurnInfoEvent;

    const websocketRef = useRef<WebSocket | null>(null);

    const connectWebSocket = () => {
        if (websocketRef.current && websocketRef.current.readyState === WebSocket.OPEN) {
            logMsg("Already connected!");
            return;
        }

        const ws = new WebSocket("ws://localhost:8080/scoreboard");
        websocketRef.current = ws;

        ws.onopen = () => logMsg("Connected!");
        ws.onmessage = (event: MessageEvent) => handleWsMessage(event);
        ws.onclose = () => logMsg("Disconnected");
        ws.onerror = (event) => console.error(event);
    };

    const handleWsMessage = (event: MessageEvent) => {
        const data = JSON.parse(event.data) as unknown;
        if (!isEvent(data)) {
            console.error("Invalid event payload", data);
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
                handleGameEvent(evt, setPkmnLvl, setPkmnGen, setTurnNum);
                break;
            case "PLAYER_EVENT":
                handlePlayerEvent(evt, players, setPlayers);
                break;
            case "TURN_ACTION_EVENT":
                handleTurnActionEvent(evt);
                break;
            case "TURN_INFO_EVENT":
                handleTurnInfoEvent(evt, setPlayerTurnOpts);
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
            <Button onClick={connectWebSocket}>
                <Unplug /> Connect Websocket
            </Button>
        </div>
    );
}

export default WebSocketButton;
