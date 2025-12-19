import React, { useEffect, useState } from "react";
import { toast } from "sonner";

import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

import type { PlayerDto } from "./types/PlayerDto";
import ChoosePokemonTeam from "./ChoosePokemonTeam";
import { Button } from "../ui/button";
import PlayerTeamButtons from "./PlayerTeamButtons";
import AvatarSelection from "./AvatarSelection";

export default function Lobby() {
    const blankPlayer: PlayerDto = {
        username: "",
        avatarUrl: "",
        teamNum: 1,
        pkmnTeam: ["", "", "", "", "", ""],
    };
    const [player, setPlayer] = useState<PlayerDto>(blankPlayer);

    const isValidPlayer = (player: PlayerDto) => {
        if (!player.username || !player.username.trim()) {
            console.error("Player username is not valid.");
            return false;
        }
        if (!player.avatarUrl || !player.avatarUrl.trim()) return false;
        const hasPokemon = player.pkmnTeam.some((pkmn) => pkmn.trim() !== "");
        if (!hasPokemon) return false;
        return true;
    };

    const addNewPlayer = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isValidPlayer(player)) {
            if (player.username.length === 0)
                try {
                    const res = await fetch("/clapped/player/join", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(player),
                    });
                    console.log(res.body);
                    if (!res.ok) {
                        throw new Error();
                    }
                    toast.success(`Added new player to game: ${player.username}`);
                    setPlayer(blankPlayer);
                } catch (err) {
                    console.error(err);
                    toast.error("Error saving player to game, please try again.");
                }
        }
    };

    useEffect(() => {
        console.log(player);
    }, [player]);

    return (
        <div>
            <h2 className="font-tanklager text-5xl mb-5">Player Lobby</h2>
            <div className="flex gap-5 items-center">
                <form onSubmit={addNewPlayer} className="flex gap-5">
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
                    <Button>Submit</Button>
                </form>
                <h3 className="font-tanklager text-3xl">Leave</h3>
            </div>
            <form></form>
        </div>
    );
}
