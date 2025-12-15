import React from "react";
import { Button } from "~/components/ui/button";
import { RefreshCcw } from "lucide-react";
import type { GameState } from "~/types/GameState";
import type { PlayerEvent } from "~/types/events/PlayerEvent";
import { handleGameState } from "./HandleEvents";
import type { Player } from "~/types/Player";
import type { Generation } from "~/types/Generation";

interface FetchBtnProps {
    logMsg: (msg: string) => void;
    setPkmnLvl: React.Dispatch<React.SetStateAction<number | null>>;
    setPkmnGen: React.Dispatch<React.SetStateAction<Generation | undefined>>;
    setShowdownIcons: React.Dispatch<React.SetStateAction<boolean>>;
    setPlayers: React.Dispatch<React.SetStateAction<Player[]>>;
}

function ManualFetchButton({ logMsg, setPkmnLvl, setPkmnGen, setShowdownIcons, setPlayers }: FetchBtnProps) {
    async function manualFetch() {
        try {
            const response = await fetch("/game/currentState");
            if (!response.ok) {
                console.error(`HTTP error! status: ${response.status}`);
            }

            const gameState: GameState = await response.json();
            handleGameState(gameState, logMsg, setPkmnLvl, setPkmnGen, setShowdownIcons, setPlayers);
        } catch (err: any) {
            console.error(err.message || "Something went wrong");
        }
    }
    return (
        <div>
            <Button onClick={manualFetch}>
                <RefreshCcw /> Manual Fetch
            </Button>
        </div>
    );
}

export default ManualFetchButton;
