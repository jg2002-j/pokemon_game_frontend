import { Progress } from "~/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "~/components/ui/tooltip";

import type { Pokemon } from "~/types/Pokemon";
import PokeSprite from "../PokeSprite";

interface PokemonTileProps {
    activePkmn: boolean;
    pokemon: Pokemon;
}

export default function PokemonTile({ activePkmn, pokemon }: PokemonTileProps) {
    const scale = activePkmn ? 2 : 1;
    const hpPercent = Math.max(0, Math.min(100, (pokemon.currentHp / pokemon.baseStats.HP) * 100));

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div className="flex w-full gap-5 items-center">
                        <PokeSprite id={pokemon.id} />
                        {activePkmn && (
                            <div className="w-full flex flex-col gap-2">
                                <div className="flex justify-between items-baseline">
                                    <p className="font-pokemon font-black text-xl">{pokemon.name.toUpperCase()}</p>
                                    <p className="font-pokemon text-sm text-gray-500">
                                        {pokemon.currentHp}/{pokemon.baseStats.HP}
                                    </p>
                                </div>
                                <Progress value={hpPercent} className="w-full" />
                            </div>
                        )}
                    </div>
                </TooltipTrigger>
                <TooltipContent className="flex flex-col gap-2 font-pokemon text-xs select-none">
                    <h4 className="font-pokemon text-base">{pokemon.name.toUpperCase()}</h4>
                    <div className="flex gap-1">
                        {pokemon.types.map((t, index) => (
                            <img key={index} src={t.imgLink} alt={t.name} className="h-3" />
                        ))}
                    </div>
                    <div className="grid grid-cols-2 gap-x-5 items-center">
                        <h5>HP:</h5>
                        <p>
                            {pokemon.currentHp}/{pokemon.baseStats.HP}
                        </p>
                        <h5>ATTACK:</h5>
                        <p>{pokemon.baseStats.ATTACK}</p>
                        <h5>DEFENSE:</h5>
                        <p>{pokemon.baseStats.DEFENSE}</p>
                        <h5>SP. ATK:</h5>
                        <p>{pokemon.baseStats.SPECIAL_ATTACK}</p>
                        <h5>SP. DEF</h5>
                        <p>{pokemon.baseStats.SPECIAL_DEFENSE}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-x-5 items-center font-bold uppercase">
                        {!activePkmn && (
                            <>
                                {pokemon.moves.map((move, index) => (
                                    <div key={index}>{move.name}</div>
                                ))}
                            </>
                        )}
                    </div>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
