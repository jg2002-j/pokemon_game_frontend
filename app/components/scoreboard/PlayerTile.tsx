import type { Player } from "~/types/Player";
import { Progress } from "~/components/ui/progress";
import { useState } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "~/components/ui/tooltip";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import type { ImgLinks } from "~/types/ImgLinks";

interface PlayerTileProps {
    p: Player;
    icon: keyof ImgLinks;
}

export default function PlayerTile({ p, icon }: PlayerTileProps) {
    const hpPercent = Math.max(0, Math.min(100, (p.pokemon.currentHp / p.pokemon.baseStats.HP) * 100));
    return (
        <>
            <Card className="w-full min-w-xs max-w-sm">
                <CardHeader>
                    <CardTitle>{p.username}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-2 h-full">
                    <div className="flex w-full gap-5 justify-between items-center">
                        <img src={p.pokemon.imgLinks[icon]} alt={p.pokemon.name} className="w-16 h-16" />
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between items-center">
                                <p>{p.pokemon.name.toUpperCase()}</p>
                                <p className="font-mono text-xs text-gray-500">
                                    {p.pokemon.currentHp}/{p.pokemon.baseStats.HP}
                                </p>
                            </div>
                            <Progress value={hpPercent} className="w-48" />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 text-xs uppercase">
                        {p.pokemon.moves.map((m) => (
                            <TooltipProvider key={m.name}>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <div className="rounded border px-2 py-1 grid grid-cols-4 gap-5">
                                            <span className="col-span-1">{m.type}</span>
                                            <span className="col-span-2">{m.name}</span>
                                            <span className="col-span-1 font-mono text-gray-500 text-end">
                                                {m.currentPp}/{m.basePp}
                                            </span>
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>{m.damageClass}</p>
                                        <p>Accuracy: {m.accuracy}%</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        ))}
                    </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                    {p.pokemonTeam.map((pokemon) => (
                        <TooltipProvider key={pokemon.id}>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <img src={pokemon.imgLinks[icon]} alt={pokemon.name} className="w-8 h-8" />
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
