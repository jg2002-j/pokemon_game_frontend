import type { Player } from "~/types/Player";
import { Progress } from "~/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "~/components/ui/tooltip";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";

interface PlayerTileProps {
    p: Player;
}

export default function PlayerTile({ p }: PlayerTileProps) {
    const hpPercent = Math.max(0, Math.min(100, (p.pokemon.currentHp / p.pokemon.baseStats.HP) * 100));
    return (
        <>
            <Card className="w-full min-w-xs max-w-sm">
                <CardHeader>
                    <CardTitle>{p.username}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-2 h-full">
                    <div className="flex w-full gap-5 justify-between items-center">
                        <img src={p.pokemon.spriteLink} alt={p.pokemon.name} className="w-16 h-16" />
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
                        {p.pokemon.moves.map((m, index) => (
                            <TooltipProvider
                                key={`${p.username}-${p.pokemon.id}-${p.activePokemonIndex}-${m.name}-${index}`}
                            >
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <div className="rounded border px-2 py-1 grid grid-cols-4 gap-5 items-center">
                                            <img src={m.type.imgLink} alt={m.type.name} className="h-3" />
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
                    {p.pokemonTeam.map((pokemon, index) => (
                        <TooltipProvider key={`${p.username}-${pokemon.id}-${index}`}>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <img src={pokemon.spriteLink} alt={pokemon.name} className="w-8 h-8" />
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
