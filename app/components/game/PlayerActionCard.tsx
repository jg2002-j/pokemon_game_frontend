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
import PokemonTile from "../scoreboard/PokemonTile";

interface PlayerActionCardProps {
    player: Player;
}

export default function PlayerActionCard({ player }: PlayerActionCardProps) {
    const { playerTurnOpts, queuedActions } = useGameContext();
    const options: ActionType[] | undefined = playerTurnOpts.find((opt) => opt.username === player.username)?.options;
    const turnQueuedAlready: boolean = queuedActions.some((action) => action.username === player.username);
    const [choice, setChoice] = useState<ActionType>("NONE");

    useEffect(() => {
        setChoice("NONE");
    }, [player]);

    return (
        <Card key={player.username} className="w-xl col-start-2">
            <CardHeader className="flex gap-3 justify-center items-center">
                <img src={player.avatarUrl} alt={player.username} className="size-16" />
                <CardTitle className="font-tanklager text-4xl">{player.username}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-5 mx-4">
                <div className="mx-auto w-sm">
                    <PokemonTile pokemon={player.pokemon} activePkmn={true} />
                </div>
                {turnQueuedAlready ? (
                    <div className="flex gap-5 items-center">
                        <h3 className="font-pokemon text-lg max-w-xs text-pretty text-center">
                            You have already queued an action for this turn!
                        </h3>
                        <Button className="font-pokemon uppercase">Next Player</Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-4 gap-2 items-center h-full">
                        <Button
                            className="col-span-1 font-pokemon uppercase"
                            disabled={!options?.includes("HEAL")}
                            onClick={() => setChoice("HEAL")}
                        >
                            Heal
                        </Button>
                        <Button
                            disabled={!options?.includes("ATTACK")}
                            className="col-span-2 font-pokemon uppercase h-14"
                            onClick={() => setChoice("ATTACK")}
                        >
                            Fight
                        </Button>
                        <Button
                            className="col-span-1 font-pokemon uppercase"
                            disabled={!options?.includes("SWITCH")}
                            onClick={() => setChoice("SWITCH")}
                        >
                            Switch
                        </Button>
                    </div>
                )}
                {choice === "ATTACK" && <Attack player={player} />}
                {choice === "HEAL" && <Heal player={player} />}
                {choice === "SWITCH" && <Switch player={player} />}
            </CardContent>
        </Card>
    );
}
