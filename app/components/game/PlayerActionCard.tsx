import { useEffect, useState } from "react";

import { Button } from "../ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "../ui/card";

import type { Player } from "~/types/Player";
import type { ActionType } from "~/types/ActionType";
import { useGameContext } from "~/contexts/GameContext";
import PokemonHpBar from "../PokemonHpBar";
import PokeSprite from "../PokeSprite";

interface PlayerActionCardProps {
    player: Player;
    options: ActionType[] | undefined;
}

export default function PlayerActionCard({ player, options }: PlayerActionCardProps) {
    const { team1, team2 } = useGameContext();
    const [choice, setChoice] = useState<ActionType>("NONE");
    const [target, setTarget] = useState<string | null>(null);
    const [attackChoice, setAttackChoice] = useState<string | null>(null);
    const [healChoice, setHealChoice] = useState<string | null>(null);
    const [switchChoice, setSwitchChoice] = useState<number | null>(null);
    const [actionDesc, setActionDesc] = useState<string>(`${player.username} is choosing an action for this turn...`);

    const updateChoice = (e: React.MouseEvent<HTMLButtonElement>, val: ActionType) => {
        e.preventDefault();
        setChoice(val);
    };

    useEffect(() => {
        setChoice("NONE");
    }, [player]);

    const resetSelections = () => {
        setTarget(null);
        setAttackChoice(null);
        setHealChoice(null);
        setSwitchChoice(null);
    };

    const getActionDescription = (): string => {
        switch (choice) {
            case "ATTACK":
                if (!attackChoice) return `${player.username} will use a move this turn...`;
                if (!target) return `${player.username} will use ${attackChoice} this turn...`;
                return `${player.username} will use ${attackChoice} on ${target}'s Pokémon.`;
            case "HEAL":
                if (!healChoice) return `${player.username} will use a medicine this turn...`;
                return `${player.username} will use ${healChoice} on ${player.pokemon.name}.`;
            case "SWITCH":
                if (switchChoice === null) return `${player.username} will switch out Pokémon this turn...`;
                return `${player.username} will send out ${player.pokemonTeam[switchChoice].name} this turn.`;
            default:
                return `${player.username} is choosing an action for this turn...`;
        }
    };

    useEffect(() => {
        resetSelections();
    }, [choice]);

    useEffect(() => {
        setActionDesc(getActionDescription());
    }, [player, choice, target, attackChoice, healChoice, switchChoice]);

    return (
        <Card key={player.username} className="w-lg col-start-2">
            <CardHeader className="flex gap-3 justify-center items-center">
                <img src={player.avatarUrl} alt={player.username} className="size-16" />
                <CardTitle className="font-tanklager text-4xl">{player.username}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-5 mx-4">
                <div className="flex flex-col-2">
                    <PokeSprite id={player.pokemon.id} containerSize="h-20" />
                </div>
                <div className="grid grid-cols-4 gap-2 items-center h-full">
                    <Button
                        className="col-span-1 font-pokemon uppercase"
                        disabled={!options?.includes("HEAL")}
                        onClick={(e) => updateChoice(e, "HEAL")}
                    >
                        Heal
                    </Button>
                    <Button
                        disabled={!options?.includes("ATTACK")}
                        className="col-span-2 font-pokemon uppercase h-14"
                        onClick={(e) => updateChoice(e, "ATTACK")}
                    >
                        Fight
                    </Button>
                    <Button
                        className="col-span-1 font-pokemon uppercase"
                        disabled={!options?.includes("SWITCH")}
                        onClick={(e) => updateChoice(e, "SWITCH")}
                    >
                        Switch
                    </Button>
                </div>
                {choice === "ATTACK" && (
                    <>
                        <hr />
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
                    </>
                )}

                {choice === "HEAL" && (
                    <>
                        <hr />
                        <div className="grid grid-cols-2 gap-2">
                            <Button onClick={() => setHealChoice("Potion")} className="font-pokemon uppercase">
                                Potion
                            </Button>
                            <Button onClick={() => setHealChoice("Super Potion")} className="font-pokemon uppercase">
                                Super Potion
                            </Button>
                            <Button onClick={() => setHealChoice("Full Heal")} className="font-pokemon uppercase">
                                Full Heal
                            </Button>
                            <Button onClick={() => setHealChoice("Full Restore")} className="font-pokemon uppercase">
                                Full Restore
                            </Button>
                        </div>
                    </>
                )}

                {choice === "SWITCH" && (
                    <>
                        <hr />
                        <div className="flex gap-2">
                            {player.pokemonTeam.map((p, index) => (
                                <Button
                                    onClick={() => setSwitchChoice(index)}
                                    key={index}
                                    variant={
                                        switchChoice !== null && player.pokemonTeam[switchChoice] === p
                                            ? "active"
                                            : "default"
                                    }
                                    className="p-2 h-fit text-start"
                                    size="sm"
                                >
                                    <PokeSprite id={p.id} />
                                </Button>
                            ))}
                        </div>
                    </>
                )}
                {choice === "ATTACK" && attackChoice && (
                    <>
                        <div className="grid grid-cols-5 gap-2">
                            {(player.teamNum === 1 ? team2 : team1).map((p, index) => (
                                <Button
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
                    </>
                )}
            </CardContent>
            <CardFooter className="flex flex-col items-center mx-4">
                <p className="w-fit font-pokemon uppercase">{actionDesc}</p>
            </CardFooter>
        </Card>
    );
}
