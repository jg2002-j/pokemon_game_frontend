import { createContext, useContext, useEffect, useRef, useState, useCallback } from "react";

import { toast } from "sonner";
import { useGameContext } from "./GameContext";
import type { WsMessage } from "~/types/WsMessage";
import { getGenFromNum, getGenFromName } from "~/types/Generation";
import type { Player } from "~/types/Player";
import type { PlayerTurnOption } from "~/types/PlayerTurnOptions";

type WebSocketContextValue = {
    connected: boolean;
    connect: () => void;
    disconnect: () => void;
    send: (data: unknown) => void;
};

const WebSocketContext = createContext<WebSocketContextValue | null>(null);

export function WebSocketProvider({ children }: { children: React.ReactNode }) {
    const socketRef = useRef<WebSocket | null>(null);
    const { logMsg, setPkmnGen, setPkmnLvl, setTurnNum, setPlayers, setPlayerTurnOpts, setQueuedActions } =
        useGameContext();
    const [connected, setConnected] = useState(false);

    const handleMessage = (event: MessageEvent) => {
        try {
            const data = JSON.parse(event.data);
            handleEvent(data);
        } catch (err) {
            console.error("WS parse error", err);
        }
    };

    const handleEvent = (data: WsMessage) => {
        console.log(data);
        data.logMsgs.forEach((msg) => logMsg(msg));
        const { pkmnGen, pkmnLvl, turnNum, players, playerTurnOptions, usernamesAndActions } = data.payload;
        setPkmnGen(getGenFromNum(pkmnGen));
        setPkmnLvl(pkmnLvl);
        setTurnNum(turnNum);
        const playerArray: Player[] = Object.values(players).sort((a, b) => a.username.localeCompare(b.username));
        setPlayers(playerArray);
        const mappedPlayerTurnOptions: PlayerTurnOption[] = Object.entries(playerTurnOptions).map(
            ([username, options]) => ({ username, options })
        );
        setPlayerTurnOpts(mappedPlayerTurnOptions);
        const mappedPlayerQueuedActions: PlayerQueuedAction[] = Object.entries(usernamesAndActions).map(
            ([username, actionStr]) => ({ username, actionStr })
        );
        setQueuedActions(mappedPlayerQueuedActions);
    };

    const connect = useCallback(() => {
        if (socketRef.current?.readyState === WebSocket.OPEN) {
            console.log("Already connected to server!");
            return;
        }

        const ws = new WebSocket("ws://localhost:8080/scoreboard");
        socketRef.current = ws;

        ws.onopen = () => {
            console.log("Connected to server!");
            toast.success("Connected to server!");
            setConnected(true);
        };

        ws.onmessage = handleMessage;

        ws.onclose = () => {
            console.log("Disconnected from server!");
            toast.warning("Disconnected from server!");
            setConnected(false);
            socketRef.current = null;
        };

        ws.onerror = (err) => console.error("WebSocket error", err);
    }, []);

    const disconnect = useCallback(() => {
        socketRef.current?.close();
        socketRef.current = null;
        setConnected(false);
    }, []);

    const send = useCallback((data: unknown) => {
        if (socketRef.current?.readyState !== WebSocket.OPEN) {
            console.warn("WebSocket not connected");
            return;
        }
        socketRef.current.send(JSON.stringify(data));
    }, []);

    useEffect(() => {
        return () => {
            socketRef.current?.close();
        };
    }, []);

    useEffect(() => {
        connect();

        return () => {
            socketRef.current?.close();
            socketRef.current = null;
        };
    }, [connect]);

    return (
        <WebSocketContext.Provider value={{ connected, connect, disconnect, send }}>
            {children}
        </WebSocketContext.Provider>
    );
}

export function useWebSocket() {
    const ctx = useContext(WebSocketContext);
    if (!ctx) {
        throw new Error("useWebSocket must be used inside WebSocketProvider");
    }
    return ctx;
}
