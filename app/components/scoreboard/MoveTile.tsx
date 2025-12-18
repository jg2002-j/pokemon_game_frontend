import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "~/components/ui/tooltip";
import type { Move } from "~/types/Move";
import type { Player } from "~/types/Player";

interface MoveTileProps {
    player: Player;
    move: Move;
    index: number;
}

export default function MoveTile({ player, move, index }: MoveTileProps) {
    return (
        <TooltipProvider
            key={`${player.username}-${player.pokemon.id}-${player.activePokemonIndex}-${move.name}-${index}`}
        >
            <Tooltip>
                <TooltipTrigger asChild>
                    <div className="rounded border px-2 py-1 grid grid-cols-4 gap-5 items-center">
                        <img src={move.type.imgLink} alt={move.type.name} className="h-3" />
                        <span className="font-pokemon col-span-2">{move.name}</span>
                        <span className="font-pokemon col-span-1 text-gray-500 text-end">
                            {move.currentPp}/{move.basePp}
                        </span>
                    </div>
                </TooltipTrigger>
                <TooltipContent className="flex flex-col gap-2 font-pokemon text-xs max-w-48 select-none">
                    <h4 className="font-bold text-base">{move.name}</h4>
                    <div>
                        <img src={move.type.imgLink} alt={move.type.name} className="h-4" />
                    </div>
                    <div className="w-full grid grid-cols-2 gap-x-5">
                        <h5>PP:</h5>
                        <p>
                            {move.currentPp}/{move.basePp}
                        </p>
                        <h5>POWER:</h5>
                        <p>{move.power != null ? move.power : "--"}</p>
                        <h5>CATEGORY:</h5>
                        <p>{move.damageClass}</p>
                        <h5>Accuracy:</h5>
                        <p>{move.accuracy != null ? `${move.accuracy}%` : "--"}</p>
                    </div>
                    <p className="text-wrap font-base">{move.textDesc}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
