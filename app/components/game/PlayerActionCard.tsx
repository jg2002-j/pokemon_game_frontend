import { useEffect, useState } from "react";

import { Button } from "../ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "../ui/card";

import type { Player } from "~/types/Player";
import type { ActionType } from "~/types/ActionType";
import { useGameContext } from "~/contexts/GameContext";
import PokemonHpBar from "../PokemonHpBar";
import PokeSprite from "../PokeSprite";
import Attack from "./Attack";
import Switch from "./Switch";
import Heal from "./Heal";

interface PlayerActionCardProps {
    player: Player;
}

export default function PlayerActionCard({ player }: PlayerActionCardProps) {
    const { playerTurnOpts } = useGameContext();
    const options = playerTurnOpts.find((opt) => opt.username === player.username)?.options;

    const [choice, setChoice] = useState<ActionType>("NONE");
    const [actionDesc, setActionDesc] = useState<string>(`${player.username} is choosing an action for this turn...`);

    useEffect(() => {
        setChoice("NONE");
    }, [player]);

    return (
        <Card key={player.username} className="w-lg col-start-2">
            <CardHeader className="flex gap-3 justify-center items-center">
                <img src={player.avatarUrl} alt={player.username} className="size-16" />
                <CardTitle className="font-tanklager text-4xl">{player.username}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-5 mx-4">
                <div className="flex flex-col-2">
                    <PokeSprite id={player.pokemon.id} containerSize="h-20" />
                </div>
                <div className="grid grid-cols-4 gap-2 items-center h-full">
                    <Button
                        className="col-span-1 font-pokemon uppercase"
                        disabled={!options?.includes("HEAL")}
                        onClick={(e) => setChoice("HEAL")}
                    >
                        Heal
                    </Button>
                    <Button
                        disabled={!options?.includes("ATTACK")}
                        className="col-span-2 font-pokemon uppercase h-14"
                        onClick={(e) => setChoice("ATTACK")}
                    >
                        Fight
                    </Button>
                    <Button
                        className="col-span-1 font-pokemon uppercase"
                        disabled={!options?.includes("SWITCH")}
                        onClick={(e) => setChoice("SWITCH")}
                    >
                        Switch
                    </Button>
                </div>
                {choice === "ATTACK" && <Attack player={player} />}
                {choice === "HEAL" && <Heal player={player} />}
                {choice === "SWITCH" && <Switch player={player} />}
            </CardContent>
            <CardFooter className="flex flex-col items-center mx-4">
                <p className="w-fit font-pokemon uppercase">{actionDesc}</p>
            </CardFooter>
        </Card>
    );
}
