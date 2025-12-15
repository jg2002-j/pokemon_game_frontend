import type { Player } from "~/types/Player";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import MoveTile from "./MoveTile";
import PokemonTile from "./PokemonTile";

interface PlayerCardProps {
    p: Player;
}

export default function PlayerCard({ p }: PlayerCardProps) {
    return (
        <>
            <Card className="w-full min-w-xs max-w-sm">
                <CardHeader>
                    <CardTitle className="font-tanklager text-4xl">{p.username}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-2 h-full">
                    <PokemonTile activePkmn={true} player={p} pokemon={p.pokemon} index={0} />
                    <div className="flex flex-col gap-2 text-xs uppercase">
                        {p.pokemon.moves.map((m, i) => (
                            <MoveTile player={p} move={m} index={i} />
                        ))}
                    </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                    {p.pokemonTeam.map((pokemon, index) => (
                        <PokemonTile activePkmn={false} player={p} pokemon={pokemon} index={index} />
                    ))}
                </CardFooter>
            </Card>
        </>
    );
}
