import React, { useEffect, useState } from "react";
import { useGameContext } from "~/contexts/GameContext";
import { toast } from "sonner";

import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";

import NewPokemonBox from "./NewPokemonBox";

import type { PlayerDto } from "./types/PlayerDto";
import type { SimplePokemonDto } from "./types/SimplePokemonDto";

export default function Lobby() {
    const { pkmnGen } = useGameContext();
    const blankPlayer: PlayerDto = {
        username: "",
        teamNum: 1,
        pkmnTeam: ["", "", "", "", "", ""],
    };
    const [player, setPlayer] = useState<PlayerDto>(blankPlayer);
    const [pokeOptions, setPokeOptions] = useState<SimplePokemonDto[]>([]);

    const addNewPlayer = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await fetch("/clapped/player/join", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(player),
            });
            if (!res.ok) {
                throw new Error();
            }
            toast.success(`Added new player to game: ${player.username}`);
            setPlayer(blankPlayer);
        } catch (err) {
            console.error(err);
            toast.error("Error saving player to game, please try again.");
        }
    };

    useEffect(() => {
        const fetchAllPokemon = async () => {
            try {
                const response = await fetch("/clapped/pokemon/validForGen/" + pkmnGen.numericalVal, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                });
                const allPkmn: SimplePokemonDto[] = await response.json();
                setPokeOptions(allPkmn);
            } catch (err) {
                console.error(err);
            }
        };
        fetchAllPokemon();
    }, [pkmnGen]);

    return (
        <div>
            <h2 className="font-tanklager text-5xl mb-5">Player Management</h2>
            <div className="flex gap-5 items-center">
                <form onSubmit={addNewPlayer} className="flex gap-5">
                    <Card className="w-full min-w-xs max-w-sm">
                        <CardHeader>
                            <CardTitle className="font-tanklager text-4xl">Join Game</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-5 items-stretch">
                            <div className="flex flex-col gap-2 items-start">
                                <Label>Username</Label>
                                <Input
                                    type="text"
                                    value={player?.username}
                                    onChange={(e) => setPlayer({ ...player, username: e.target.value })}
                                />
                            </div>
                            <div className="flex flex-col gap-2 items-start">
                                <Label>Team</Label>
                                <RadioGroup
                                    defaultValue={player.teamNum.toString()}
                                    onValueChange={(value) =>
                                        setPlayer({ ...player!, teamNum: Number(value) as 1 | 2 })
                                    }
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value={"1"} id="team1" />
                                        <Label htmlFor="team1">Team 1</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="2" id="team2" />
                                        <Label htmlFor="team2">Team 2</Label>
                                    </div>
                                </RadioGroup>
                            </div>
                        </CardContent>
                        <CardFooter className="flex gap-2"></CardFooter>
                    </Card>
                    <Card className="w-2xl">
                        <CardHeader>
                            <CardTitle className="font-tanklager text-4xl">Choose Pokémon Team</CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-2 items-stretch">
                            <div className="flex flex-col gap-2 items-start">
                                {player.pkmnTeam.map((p, index) => (
                                    <div key={`${player}-${p}-${index}`}>{p}</div>
                                ))}
                            </div>
                            <NewPokemonBox pokeOptions={pokeOptions} player={player} setPlayer={setPlayer} />
                        </CardContent>
                        <CardFooter className="flex gap-2"></CardFooter>
                    </Card>
                </form>
                <h3 className="font-tanklager text-3xl">Leave</h3>
            </div>
            <form></form>
        </div>
    );
}
