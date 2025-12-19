import { createContext, useContext, useEffect, useRef, useState, useCallback } from "react";

import { toast } from "sonner";
import { handleEvent, isEvent } from "~/lib/eventsHandler";
import { useGameContext } from "./GameContext";

type WebSocketContextValue = {
    connected: boolean;
    connect: () => void;
    disconnect: () => void;
    send: (data: unknown) => void;
};

const WebSocketContext = createContext<WebSocketContextValue | null>(null);

export function WebSocketProvider({ children }: { children: React.ReactNode }) {
    const socketRef = useRef<WebSocket | null>(null);
    const gameContext = useGameContext();
    const [connected, setConnected] = useState(false);

    const handleMessage = (event: MessageEvent) => {
        try {
            const data = JSON.parse(event.data);
            if (!isEvent(data)) {
                toast.warning("Received malformed payload from server.");
                return;
            }
            handleEvent(data, gameContext);
        } catch (err) {
            console.error("WS parse error", err);
        }
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
