import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router";

import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "~/components/ui/tooltip";
import { Spinner } from "~/components/ui/spinner";

import type { PlayerDto } from "./types/PlayerDto";
import ChoosePokemonTeam from "./ChoosePokemonTeam";
import { Button } from "../ui/button";
import PlayerTeamButtons from "./PlayerTeamButtons";
import AvatarSelection from "./AvatarSelection";
import { useGameContext } from "~/contexts/GameContext";
import LeavePanel from "./LeavePanel";
import LobbyClosed from "./LobbyClosed";

export default function Lobby() {
    const { logMsg, turnNum } = useGameContext();
    const navigate = useNavigate();

    const blankPlayer: PlayerDto = {
        username: "",
        avatarUrl: "",
        teamNum: 1,
        pkmnTeam: [null, null, null, null, null, null],
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
        const hasPokemon = player.pkmnTeam.some((pkmn) => pkmn !== null);
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
                setSubmitting(true);
                const res = await fetch("/clapped/player/join", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(player),
                });
                if (!res.ok) {
                    if (res.status === 400) {
                        const errorMsgs = await res.json();
                        setErrors(errorMsgs);
                        errorMsgs.forEach((str: string) => {
                            toast.error(str);
                        });
                    } else {
                        throw new Error();
                    }
                } else {
                    const successMsgs = await res.json();
                    successMsgs.forEach((str: string) => {
                        toast.success(str);
                    });
                    setPlayer(blankPlayer);
                }
                setSubmitting(false);
            } catch (err) {
                console.error(err);
                toast.error("Server-side error saving player to game, please try again later.");
            }
        } else {
            setErrors(errors);
        }
    };

    const finaliseTeams = async () => {
        try {
            const res = await fetch("/clapped/game/finaliseTeams", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
            });
            if (!res.ok) {
                if (res.status === 400) {
                    const errorMsgs = await res.json();
                    setErrors(errorMsgs);
                    errorMsgs.forEach((str: string) => {
                        toast.error(str);
                    });
                } else {
                    throw new Error();
                }
            } else {
                const successMsgs = await res.json();
                successMsgs.forEach((str: string) => {
                    toast.success(str);
                });
                navigate("/game");
            }
        } catch (err) {
            console.error(err);
        }
    };

    const [submitting, setSubmitting] = useState<boolean>(false);
    const [waitText, setWaitText] = useState<string>("Please wait.");

    return turnNum !== null && turnNum > 0 ? (
        <LobbyClosed />
    ) : (
        <div className="flex flex-col gap-10">
            <div className="flex gap-10 items-center justify-center">
                <div className="flex flex-col gap-10 min-w-lg w-fit">
                    {submitting ? (
                        <Card className="flex flex-col gap-5">
                            <CardHeader className="font-tanklager text-3xl">Validating...</CardHeader>
                            <CardContent className="flex gap-5 items-center">
                                <Spinner />
                                <p className="font-pokemon text-sm">{waitText}</p>
                            </CardContent>
                        </Card>
                    ) : (
                        <form onSubmit={addNewPlayer} className="flex flex-col gap-5">
                            <Card id="choosePokemonTeam" className="h-full max-w-lg">
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
                                        <TooltipContent className="text-gray-200 bg-red-900">
                                            <ul className="list-disc list-inside font-pokemon">
                                                {errors.map((e, index) => (
                                                    <li key={index}>{e}</li>
                                                ))}
                                            </ul>
                                        </TooltipContent>
                                    )}
                                </Tooltip>
                            </TooltipProvider>
                        </form>
                    )}
                </div>
                <LeavePanel />
            </div>
            <Button
                onClick={() => finaliseTeams()}
                className="col-span-2 font-tanklager text-6xl w-fit h-fit pt-6 px-5 pb-4 mx-auto hover:bg-emerald-300 transition-all"
            >
                Finalise Teams
            </Button>
        </div>
    );
}
