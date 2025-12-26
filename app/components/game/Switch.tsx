import { useState } from "react";
import type { Player } from "~/types/Player";
import { Button } from "../ui/button";
import PokeSprite from "../PokeSprite";

interface SwitchProps {
    player: Player;
}

export default function Switch({ player }: SwitchProps) {
    const [switchChoice, setSwitchChoice] = useState<number | null>(null);
    const [actionDesc, setActionDesc] = useState<string>("");
    return (
        <>
            <div className="flex gap-2">
                {player.pokemonTeam.map((p, index) => (
                    <Button
                        onClick={() => setSwitchChoice(index)}
                        key={index}
                        variant={switchChoice !== null && player.pokemonTeam[switchChoice] === p ? "active" : "default"}
                        className="p-2 h-fit text-start"
                        size="sm"
                    >
                        <PokeSprite id={p.id} />
                    </Button>
                ))}
            </div>
        </>
    );
}
