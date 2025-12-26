import { useState } from "react";
import type { Player } from "~/types/Player";
import { Button } from "~/components/ui/button";
import PokeSprite from "../PokeSprite";
import { useGameContext } from "~/contexts/GameContext";

interface AttackProps {
    player: Player;
}

export default function Attack({ player }: AttackProps) {
    const { team1, team2 } = useGameContext();

    const [attackChoice, setAttackChoice] = useState<string | null>(null);
    const [target, setTarget] = useState<string | null>(null);

    const [actionDesc, setActionDesc] = useState<string>("");

    return (
        <>
            {attackChoice === null ? (
                <div className="grid grid-cols-2 gap-2">
                    {player.pokemon.moves.map((m, index) => (
                        <Button
                            onClick={() => setAttackChoice(m.name)}
                            key={index}
                            variant={attackChoice !== null && attackChoice === m.name ? "active" : "default"}
                            className="h-fit grid grid-cols-2 gap-2 uppercase"
                        >
                            <span className="font-pokemon font-bold col-span-2">{m.name}</span>
                            <img src={m.type.imgLink} alt={m.type.name} className="h-3" />
                            <span className="font-pokemon text-gray-800 text-xs text-end">
                                PP {m.currentPp}/{m.basePp}
                            </span>
                        </Button>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col gap-2">
                    <div className="grid grid-cols-5 gap-2">
                        {(player.teamNum === 1 ? team2 : team1).map((p, index) => (
                            <Button
                                variant={target === p.username ? "active" : "default"}
                                onClick={() => setTarget(p.username)}
                                key={index}
                                className="h-fit flex flex-col gap-2 uppercase"
                            >
                                <img src={p.avatarUrl} alt={p.username} className="" />
                                <span className="font-pokemon text-gray-800 text-sm">{p.username}</span>
                                <PokeSprite id={p.pokemon.id} />
                            </Button>
                        ))}
                    </div>
                    <div className="grid grid-cols-5 gap-2">
                        {(player.teamNum === 1 ? team1 : team2).map((p, index) => (
                            <Button
                                variant={target === p.username ? "active" : "default"}
                                disabled={p.username === player.username}
                                onClick={() => setTarget(p.username)}
                                key={index}
                                className="h-fit flex flex-col gap-2 uppercase bg-gray-500"
                            >
                                <img src={p.avatarUrl} alt={p.username} className="" />
                                <span className="font-pokemon text-gray-800 text-sm">{p.username}</span>
                                <PokeSprite id={p.pokemon.id} />
                            </Button>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}
