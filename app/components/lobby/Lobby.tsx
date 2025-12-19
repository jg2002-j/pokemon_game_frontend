import React, { useEffect, useState } from "react";
import { useGameContext } from "~/contexts/GameContext";
import { toast } from "sonner";

import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";

import type { PlayerDto } from "./types/PlayerDto";
import ChoosePokemonTeam from "./ChoosePokemonTeam";
import { Button } from "../ui/button";

export default function Lobby() {
    const blankPlayer: PlayerDto = {
        username: "",
        teamNum: 1,
        pkmnTeam: ["", "", "", "", "", ""],
    };
    const [player, setPlayer] = useState<PlayerDto>(blankPlayer);

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
        console.log(player);
    }, [player]);

    return (
        <div>
            <h2 className="font-tanklager text-5xl mb-5">Player Management</h2>
            <div className="flex gap-5 items-center">
                <form onSubmit={addNewPlayer} className="flex gap-5">
                    <Card id="choosePlayerDetails" className="w-full min-w-xs max-w-sm">
                        <CardHeader>
                            <CardTitle className="font-tanklager text-4xl">Join Game</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-5 items-stretch">
                            <div>Avatar selection</div>
                            <div className="flex flex-col gap-2 items-start">
                                <Label>Username</Label>
                                <Input
                                    type="text"
                                    value={player?.username}
                                    onChange={(e) => setPlayer({ ...player, username: e.target.value })}
                                />
                            </div>
                            <div className="flex flex-col gap-2 items-start">
                                <Label>Choose Team</Label>
                                <div className="flex gap-3">
                                    <Button
                                        className="text-lg"
                                        variant={player.teamNum === 1 ? "active" : "default"}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setPlayer({ ...player!, teamNum: 1 });
                                        }}
                                    >
                                        1
                                    </Button>
                                    <Button
                                        className="text-lg"
                                        variant={player.teamNum === 2 ? "active" : "default"}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setPlayer({ ...player!, teamNum: 2 });
                                        }}
                                    >
                                        2
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex gap-2"></CardFooter>
                    </Card>
                    <ChoosePokemonTeam player={player} setPlayer={setPlayer} />
                    <Button>Submit</Button>
                </form>
                <h3 className="font-tanklager text-3xl">Leave</h3>
            </div>
            <form></form>
        </div>
    );
}
