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
            <Card className="w-full min-w-xs max-w-sm select-none">
                <CardHeader>
                    <CardTitle className="font-tanklager text-4xl">{p.username}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-5 h-full">
                    <PokemonTile activePkmn={true} pokemon={p.pokemon} />
                    <div className="flex flex-col gap-2 text-xs uppercase">
                        {p.pokemon.moves.map((m, i) => (
                            <div key={`${p.username}-${p.pokemon.id}-${p.activePokemonIndex}-${m.name}-${i}`}>
                                <MoveTile move={m} />
                            </div>
                        ))}
                    </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                    {p.pokemonTeam.map((pokemon, index) => (
                        <div key={`${p.username}-${pokemon.id}-${index}`}>
                            <PokemonTile activePkmn={false} pokemon={pokemon} />
                        </div>
                    ))}
                </CardFooter>
            </Card>
        </>
    );
}
