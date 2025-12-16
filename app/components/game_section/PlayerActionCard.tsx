import { useState } from "react";

import { Button } from "../ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "../ui/card";

import type { Player } from "~/types/Player";
import type { ActionType } from "~/types/events/ActionType";

interface PlayerActionCardProps {
    player: Player;
    options: ActionType[] | undefined;
}

function PlayerActionCard({ player, options }: PlayerActionCardProps) {
    const [choice, setChoice] = useState<ActionType>("NONE");

    const updateChoice = (e: React.MouseEvent<HTMLButtonElement>, val: ActionType) => {
        e.preventDefault();
        setChoice(val);
    };

    return (
        <Card key={player.username} className="w-full min-w-xs max-w-sm">
            <CardHeader>
                <CardTitle className="font-tanklager text-4xl">{player.username}</CardTitle>
                <CardDescription>{options?.join(", ")}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
                <div className="grid grid-cols-4 gap-2 items-center h-full">
                    <Button
                        disabled={!options?.includes("ATTACK")}
                        className="col-span-4"
                        onClick={(e) => updateChoice(e, "ATTACK")}
                    >
                        Fight
                    </Button>
                    <Button
                        className="col-span-2"
                        disabled={!options?.includes("HEAL")}
                        onClick={(e) => updateChoice(e, "HEAL")}
                    >
                        Heal
                    </Button>
                    <Button
                        className="col-span-2"
                        disabled={!options?.includes("SWITCH")}
                        onClick={(e) => updateChoice(e, "SWITCH")}
                    >
                        Switch
                    </Button>
                </div>
                {choice === "ATTACK" && (
                    <div className="grid grid-cols-2 gap-2">
                        {player.pokemon.moves.map((m) => (
                            <Button>{m.name}</Button>
                        ))}
                    </div>
                )}
            </CardContent>
            <CardFooter className="flex gap-2">
                <div className="text-gray-500">Placeholder</div>
            </CardFooter>
        </Card>
    );
}

export default PlayerActionCard;
