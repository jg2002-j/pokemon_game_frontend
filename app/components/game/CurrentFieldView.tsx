import React from "react";
import PokemonHpBar from "../PokemonHpBar";
import PokeSprite from "../PokeSprite";
import type { Player } from "~/types/Player";
import { useGameContext } from "~/contexts/GameContext";

interface CurrentFieldViewProps {
    player: Player;
}

export default function CurrentFieldView({ player }: CurrentFieldViewProps) {
    const { team1, team2 } = useGameContext();
    return (
        <div>
            <div id="current-field-view" className="border w-full flex flex-col gap-5 items-center">
                <div id="fronts-enemies" className="flex gap-10 items-center">
                    <div id="hp-bars" className="border flex flex-col gap-2">
                        {(player.teamNum === 1 ? team2 : team1).map((p) => (
                            <div key={p.username} className="flex flex-col border w-64">
                                <div className="flex gap-2">
                                    <img src={p.avatarUrl} alt={p.username} className="h-5" />
                                    <div className="w-full flex justify-between gap-7 items-end">
                                        <p className="font-pokemon uppercase text-sm">{p.pokemon.name}</p>
                                        <p className="font-mono text-xs col-start-3">
                                            {p.pokemon.currentHp}/{p.pokemon.baseStats.HP}
                                        </p>
                                    </div>
                                </div>
                                <PokemonHpBar pokemon={p.pokemon} className="h-2 w-full" />
                            </div>
                        ))}
                    </div>
                    <div id="pokemon-display" className="border w-full grid grid-cols-5">
                        {(player.teamNum === 1 ? team2 : team1).map((p) => (
                            <div key={p.username} className="w-fit">
                                <PokeSprite id={p.pokemon.id} containerSize="h-20" />
                            </div>
                        ))}
                    </div>
                </div>
                <div id="backs-allies" className="flex flex-row-reverse gap-10 items-center">
                    <div id="hp-bars" className="border flex flex-col gap-2">
                        {(player.teamNum === 1 ? team1 : team2).map((p) => (
                            <div key={p.username} className="flex flex-col border w-64">
                                <div className="flex gap-2">
                                    <img src={p.avatarUrl} alt={p.username} className="h-5" />
                                    <div className="w-full flex justify-between gap-7 items-end">
                                        <p className="font-pokemon uppercase text-sm">{p.pokemon.name}</p>
                                        <p className="font-mono text-xs col-start-3">
                                            {p.pokemon.currentHp}/{p.pokemon.baseStats.HP}
                                        </p>
                                    </div>
                                </div>
                                <PokemonHpBar pokemon={p.pokemon} className="h-2 w-full" />
                            </div>
                        ))}
                    </div>
                    <div id="pokemon-display" className="border w-full grid grid-cols-5">
                        {(player.teamNum === 1 ? team1 : team2).map((p) => (
                            <div key={p.username} className="w-fit">
                                <PokeSprite id={p.pokemon.id} containerSize="h-20" back={true} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
