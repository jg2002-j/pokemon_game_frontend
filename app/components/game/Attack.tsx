import React, { useState } from "react";
import type { Player } from "~/types/Player";
import { Button } from "~/components/ui/button";
import PokeSprite from "../PokeSprite";
import { useGameContext } from "~/contexts/GameContext";
import { toast } from "sonner";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "~/components/ui/tooltip";
import PokemonHpBar from "../PokemonHpBar";
import type { Move } from "~/types/Move";

interface AttackProps {
    player: Player;
}

export default function Attack({ player }: AttackProps) {
    const { team1, team2 } = useGameContext();

    const [move, setMove] = useState<Move | null>(null);
    const [target, setTarget] = useState<Player | null>(null);

    const isTarget = () => {
        return true;
    };

    const submitAttack = async () => {
        if (move !== null && target !== null) {
            try {
                const res = await fetch(
                    "/clapped/turn/attack/" + player.username + "/" + target.username + "/" + move.name,
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                    }
                );
                if (!res.ok) throw new Error("Failed to submit attack move.");
                console.log(res);
                toast.success(`Move confirmed!`);
            } catch (err) {
                console.error(err);
                toast.error("Error submitting attack move, please try again.");
            }
        } else {
            toast.error("You must choose a move and a target.");
        }
    };

    return (
        <>
            {move === null ? (
                <div className="grid grid-cols-2 gap-2">
                    {player.pokemon.moves.map((m, index) => (
                        <Button
                            onClick={() => setMove(m)}
                            key={index}
                            className="h-fit grid grid-cols-2 gap-2 uppercase"
                        >
                            <span className="font-pokemon font-bold col-span-2">{m.name}</span>
                            <img src={m.type.imgLink} alt={m.type.name} className="h-3" />
                            <span className="font-pokemon text-gray-800 text-xs text-end">
                                PP {m.currentPp}/{m.basePp}
                            </span>
                        </Button>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col gap-2">
                    <div id="enemies" className="grid grid-cols-5 gap-2">
                        {(player.teamNum === 1 ? team2 : team1).map((p, index) => (
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button
                                            variant={target?.username === p.username ? "active" : "default"}
                                            disabled={!isTarget()}
                                            onClick={() => setTarget(p)}
                                            key={index}
                                            className="h-fit flex flex-col gap-2 uppercase"
                                        >
                                            <p className="font-pokemon text-sm">{p.pokemon.name}</p>
                                            <PokeSprite id={p.pokemon.id} />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent className="flex gap-2 min-w-48 ps-1">
                                        <img src={p.avatarUrl} alt={p.username} className="h-10" />
                                        <div className="flex flex-col gap-1 w-full">
                                            <span className="font-pokemon font-bold">{p.username}</span>
                                            <div className="flex gap-2 items-center">
                                                <PokemonHpBar pokemon={p.pokemon} className="h-2" />
                                                <p className="font-pokemon text-xs">
                                                    {p.pokemon.currentHp}/{p.pokemon.baseStats.HP}
                                                </p>
                                            </div>
                                        </div>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        ))}
                    </div>
                    <div id="allies" className="grid grid-cols-5 gap-2">
                        {(player.teamNum === 1 ? team1 : team2).map((p, index) => (
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button
                                            disabled={!isTarget()}
                                            variant={target?.username === p.username ? "active" : "neutral"}
                                            onClick={() => setTarget(p)}
                                            key={index}
                                            className="h-fit flex flex-col gap-2 uppercase"
                                        >
                                            <p className="font-pokemon text-sm">{p.pokemon.name}</p>
                                            <PokeSprite id={p.pokemon.id} />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent className="bg-secondary-background text-foreground flex gap-2 min-w-48 ps-1">
                                        <img src={p.avatarUrl} alt={p.username} className="h-10" />
                                        <div className="flex flex-col gap-1 w-full">
                                            <span className="font-pokemon font-bold">{p.username}</span>
                                            <div className="flex gap-2 items-center">
                                                <PokemonHpBar pokemon={p.pokemon} className="h-2" />
                                                <p className="font-pokemon text-xs">
                                                    {p.pokemon.currentHp}/{p.pokemon.baseStats.HP}
                                                </p>
                                            </div>
                                        </div>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        ))}
                    </div>
                    <div className="self-end">
                        <Button onClick={() => setMove(null)} className="font-pokemon uppercase text-xs">
                            Back
                        </Button>
                    </div>
                </div>
            )}
        </>
    );
}
