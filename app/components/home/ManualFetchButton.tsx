import React from "react";

import { RefreshCcw } from "lucide-react";

import { Button } from "~/components/ui/button";

import { handleGameState } from "../../lib/events_handler";

import type { GameState } from "~/types/GameState";

function ManualFetchButton() {
    async function manualFetch() {
        try {
            const response = await fetch("/game/currentState");
            if (!response.ok) {
                console.error(`HTTP error! status: ${response.status}`);
            }
            const gameState: GameState = await response.json();
            handleGameState(gameState);
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
