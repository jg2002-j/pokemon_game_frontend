import React, { useEffect, useState } from "react";

import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";

import PokemonSlotCombobox from "./PokemonSlotCombobox";
import type { SimplePokemonDto } from "~/types/SimplePokemonDto";
import { useGameContext } from "~/GameContext";

interface JoinLeaveProps {
    genChoice: number;
}

interface PlayerDto {
    username: string;
    teamNum: 1 | 2;
    pkmnTeam: [string, string, string, string, string, string];
}

function JoinLeave({ genChoice }: JoinLeaveProps) {
    const { pkmnGen } = useGameContext();
    const blankPlayer: PlayerDto = {
        username: "",
        teamNum: 1,
        pkmnTeam: ["", "", "", "", "", ""],
    };
    const [newPlayer, setNewPlayer] = useState<PlayerDto>(blankPlayer);
    const [pokeOptions, setPokeOptions] = useState<SimplePokemonDto[]>([]);

    const addNewPlayer = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await fetch("clapped/player/join", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: "",
            });
            setNewPlayer(blankPlayer);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        const fetchAllPokemon = async () => {
            try {
                const response = await fetch("clapped/pokemon/validForGen/" + pkmnGen.numericalVal, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                });
                const allPkmn: SimplePokemonDto[] = await response.json();
                console.log(allPkmn);
                setPokeOptions(allPkmn);
            } catch (err) {
                console.error(err);
            }
        };
        fetchAllPokemon();
    }, [genChoice]);

    useEffect(() => {
        console.log(pokeOptions);
    }, [pokeOptions]);

    useEffect(() => {
        console.log(newPlayer);
    }, [newPlayer]);

    return (
        <div>
            <h2 className="font-tanklager text-5xl mb-5">Players</h2>
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
                                    value={newPlayer?.username}
                                    onChange={(e) => setNewPlayer({ ...newPlayer, username: e.target.value })}
                                />
                            </div>
                            <div className="flex flex-col gap-2 items-start">
                                <Label>Team</Label>
                                <RadioGroup
                                    defaultValue={newPlayer.teamNum.toString()}
                                    onValueChange={(value) =>
                                        setNewPlayer({ ...newPlayer!, teamNum: Number(value) as 1 | 2 })
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
                        <CardContent className="flex flex-col gap-5 items-stretch">
                            <div className="flex gap-3">
                                <Avatar>
                                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </div>
                            <PokemonSlotCombobox pokeOptions={pokeOptions} />
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

export default JoinLeave;
