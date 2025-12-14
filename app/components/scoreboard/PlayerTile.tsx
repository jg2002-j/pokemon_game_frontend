import type { Player } from "~/types/Player";
import { Progress } from "~/components/ui/progress";
import { useState } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "~/components/ui/tooltip";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";

export default function PlayerTile({ p }: { p: Player }) {
    const hpPercent = Math.max(0, Math.min(100, (p.pokemon.currentHp / p.pokemon.baseStats.HP) * 100));

    return (
        <>
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>{p.username}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-2">
                    <div className="flex w-full justify-between items-center">
                        <img src={p.pokemon.imgLink} alt={p.pokemon.name} className="w-16 h-16" />
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between items-center">
                                <p>{p.pokemon.name.toUpperCase()}</p>
                                <p className="font-mono text-xs text-gray-500">
                                    {p.pokemon.currentHp}/{p.pokemon.baseStats.HP}
                                </p>
                            </div>
                            <Progress value={hpPercent} className="w-64" />
                        </div>
                    </div>
                    <div className="flex flex-col gap-1 text-xs uppercase">
                        {p.pokemon.moves.map((m) => (
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <div key={m.name} className="rounded border-2 px-2 py-1 flex justify-between">
                                            <span>{m.name}</span>
                                            <span className="font-mono text-gray-500">
                                                {m.currentPp}/{m.basePp}
                                            </span>
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>{m.damageClass}</p>
                                        <p>Type: {m.type}</p>
                                        <p>Accuracy: {m.accuracy}%</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        ))}
                    </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                    {p.pokemonTeam.map((pokemon) => (
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <img src={pokemon.imgLink} alt={pokemon.name} className="w-8 h-8" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>{pokemon.name.toUpperCase()}</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    ))}
                </CardFooter>
            </Card>
        </>
    );
}
