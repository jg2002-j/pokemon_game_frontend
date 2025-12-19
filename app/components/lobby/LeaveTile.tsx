import React from "react";
import type { Player } from "~/types/Player";
import { Button } from "../ui/button";

interface LeaveTileProps {
    player: Player;
    index: number;
}

export default function LeaveTile({ player, index }: LeaveTileProps) {
    return (
        <>
            <div key={index} className="grid grid-cols-6 gap-2 items-center">
                <img src={player.avatarUrl} alt={`${player.username}-avatar`} className="size-12 col-span-1" />
                <h4 className="font-pokemon col-span-2">{player.username}</h4>
                <div className="col-span-2 flex gap-1 items-center px-2">
                    {player.pokemonTeam.map((_, index) => (
                        <img
                            key={index}
                            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"
                            alt="poke-ball"
                            className="size-4"
                        />
                    ))}
                </div>
                <Button size={"sm"} className="col-span-1">
                    Leave
                </Button>
            </div>
        </>
    );
}
