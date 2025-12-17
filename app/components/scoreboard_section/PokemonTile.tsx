import { useGameContext } from "~/GameContext";

import { Progress } from "~/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "~/components/ui/tooltip";

import type { Player } from "~/types/Player";
import type { Pokemon } from "~/types/Pokemon";

interface PokemonTileProps {
    activePkmn: boolean;
    player: Player;
    pokemon: Pokemon;
    index: number;
}

function PokemonTile({ activePkmn, player, pokemon, index }: PokemonTileProps) {
    const { getSpriteLink } = useGameContext();
    const sizes = activePkmn ? "w-16 h-16" : "w-8 h-8";
    const hpPercent = Math.max(0, Math.min(100, (pokemon.currentHp / pokemon.baseStats.HP) * 100));

    return (
        <TooltipProvider key={`${player.username}-${pokemon.id}-${index}`}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div className="flex w-full gap-5 items-center">
                        <img src={getSpriteLink(pokemon.id)} alt={pokemon.name} className={sizes} />
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
                        {pokemon.types.map((t) => (
                            <img src={t.imgLink} alt={t.name} className="h-4" />
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
                                {pokemon.moves.map((move) => (
                                    <div>{move.name}</div>
                                ))}
                            </>
                        )}
                    </div>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}

export default PokemonTile;
