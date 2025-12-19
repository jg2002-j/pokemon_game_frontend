import React from "react";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import type { PlayerDto } from "./types/PlayerDto";

interface PlayerTeamButtonsProps {
    player: PlayerDto;
    setPlayer: React.Dispatch<React.SetStateAction<PlayerDto>>;
}

export default function PlayerTeamButtons({ player, setPlayer }: PlayerTeamButtonsProps) {
    return (
        <div className="flex flex-col gap-2 items-start">
            <Label>Team</Label>
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
    );
}
