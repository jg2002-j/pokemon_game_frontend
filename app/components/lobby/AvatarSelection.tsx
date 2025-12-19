import React, { useEffect, useState } from "react";
import { Avatars } from "./types/Avatar";
import type { PlayerDto } from "./types/PlayerDto";
import { Button } from "../ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface AvatarSelectionProps {
    player: PlayerDto;
    setPlayer: React.Dispatch<React.SetStateAction<PlayerDto>>;
}

export default function AvatarSelection({ player, setPlayer }: AvatarSelectionProps) {
    const [index, setIndex] = useState<number>(0);

    useEffect(() => {
        setIndex(Math.floor(Math.random() * Avatars.length));
    }, []);

    useEffect(() => {
        setPlayer({ ...player!, avatarUrl: Avatars[index].url });
    }, [index]);

    return (
        <div className="w-fit flex flex-col items-center gap-4">
            <img className="select-none" src={Avatars[index].url} alt={Avatars[index].name} />
            <div className="w-full flex justify-between gap-2">
                <Button
                    size={"icon-sm"}
                    disabled={index === 0}
                    onClick={(e) => {
                        e.preventDefault();
                        setIndex(index - 1);
                    }}
                >
                    <ArrowLeft />
                </Button>
                <Button
                    size={"icon-sm"}
                    disabled={index === Avatars.length - 1}
                    onClick={(e) => {
                        e.preventDefault();
                        setIndex(index + 1);
                    }}
                >
                    <ArrowRight />
                </Button>
            </div>
        </div>
    );
}
