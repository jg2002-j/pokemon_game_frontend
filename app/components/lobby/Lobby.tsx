import React, { useEffect, useState } from "react";
import { toast } from "sonner";

import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "~/components/ui/tooltip";

import type { PlayerDto } from "./types/PlayerDto";
import ChoosePokemonTeam from "./ChoosePokemonTeam";
import { Button } from "../ui/button";
import PlayerTeamButtons from "./PlayerTeamButtons";
import AvatarSelection from "./AvatarSelection";
import { useGameContext } from "~/contexts/GameContext";
import LeaveTile from "./LeaveTile";

export default function Lobby() {
    const { logMsg, team1, team2 } = useGameContext();

    const blankPlayer: PlayerDto = {
        username: "",
        avatarUrl: "",
        teamNum: 1,
        pkmnTeam: ["", "", "", "", "", ""],
    };
    const [player, setPlayer] = useState<PlayerDto>(blankPlayer);

    const [errors, setErrors] = useState<string[]>([]);

    const isValidPlayer = (player: PlayerDto): { valid: boolean; errors: string[] } => {
        const errors: string[] = [];
        if (!player.username || !player.username.trim()) {
            errors.push("Player username is not valid.");
        }
        if (!player.avatarUrl || !player.avatarUrl.trim()) {
            errors.push("Player avatar is not valid.");
        }
        const hasPokemon = player.pkmnTeam.some((pkmn) => pkmn.trim() !== "");
        if (!hasPokemon) {
            errors.push("There must be at least one Pokémon on the team.");
        }
        return { valid: errors.length === 0, errors };
    };

    useEffect(() => {
        const { errors } = isValidPlayer(player);
        setErrors(errors);
    }, [player]);

    const addNewPlayer = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { valid, errors } = isValidPlayer(player);
        if (valid) {
            try {
                const res = await fetch("/clapped/player/join", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(player),
                });
                if (!res.ok) throw new Error("Failed to save player.");
                toast.success(`Added new player to game: ${player.username}`);
                setPlayer(blankPlayer);
            } catch (err) {
                console.error(err);
                toast.error("Error saving player to game, please try again.");
            }
        } else {
            setErrors(errors);
            errors.forEach((e) => logMsg(e));
            toast.error("There are one or more errors with the new player.");
        }
    };

    return (
        <>
            <div className="flex flex-col gap-15 w-fit mx-auto">
                <h2 className="font-tanklager text-5xl text-center">Lobby</h2>
                <form onSubmit={addNewPlayer} className="flex flex-col gap-5">
                    <Card id="choosePokemonTeam" className="h-full">
                        <CardHeader>
                            <CardTitle className="font-tanklager text-4xl">Join Game</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-10">
                            <div className="flex items-center gap-10 px-3">
                                <AvatarSelection player={player} setPlayer={setPlayer} />
                                <div id="username" className="w-full flex flex-col gap-2 items-start">
                                    <Label>Username</Label>
                                    <Input
                                        type="text"
                                        value={player?.username}
                                        onChange={(e) => setPlayer({ ...player, username: e.target.value })}
                                    />
                                </div>
                                <PlayerTeamButtons player={player} setPlayer={setPlayer} />
                            </div>
                            <ChoosePokemonTeam player={player} setPlayer={setPlayer} />
                        </CardContent>
                    </Card>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div className="select-none flex flex-col">
                                    <Button disabled={errors.length > 0}>Submit</Button>
                                </div>
                            </TooltipTrigger>
                            {errors.length > 0 && (
                                <TooltipContent className="bg-red-400">
                                    <ul className="list-disc list-inside fonto">
                                        {errors.map((e, index) => (
                                            <li key={index}>{e}</li>
                                        ))}
                                    </ul>
                                </TooltipContent>
                            )}
                        </Tooltip>
                    </TooltipProvider>
                </form>
                <Card id="leave" className="h-full flex flex-col gap-5">
                    <CardHeader>
                        <CardTitle className="font-tanklager text-4xl">Leave Game</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-10">
                        <div className="flex flex-col gap-2">
                            <h3 className="text-2xl">Team 1</h3>
                            {team1.map((player, index) => (
                                <LeaveTile player={player} index={index} />
                            ))}
                        </div>
                        <div className="flex flex-col gap-2">
                            <h3 className="text-2xl">Team 2</h3>
                            {team2.map((player, index) => (
                                <LeaveTile player={player} index={index} />
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
