import React, { useEffect, useState } from "react";
import { CommandItem } from "../ui/command";
import { useGameContext } from "~/contexts/GameContext";
import { CheckIcon } from "lucide-react";
import { cn } from "~/lib/utils";
import type { SimplePokemonDto } from "./types/SimplePokemonDto";
import type { PlayerDto } from "./types/PlayerDto";

interface PokemonSlotComboboxOptionProps {
    p: SimplePokemonDto;
    value: string;
    activeSlot: number;
    setValue: React.Dispatch<React.SetStateAction<string>>;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setPlayer: React.Dispatch<React.SetStateAction<PlayerDto>>;
}

export default function PokemonSlotComboboxOption({
    p,
    value,
    activeSlot,
    setValue,
    setOpen,
    setPlayer,
}: PokemonSlotComboboxOptionProps) {
    const { getSprite } = useGameContext();
    const [sprite, setSprite] = useState<string | null>(null);

    useEffect(() => {
        getSprite(p.id).then(setSprite);
    }, [getSprite, sprite]);

    const updateSlotChoice = (currentValue: string) => {
        setValue(currentValue === value ? "" : currentValue);
        setOpen(false);
        setPlayer((prev) => {
            const newTeam = [...prev.pkmnTeam] as PlayerDto["pkmnTeam"];
            newTeam[activeSlot] = currentValue;
            return {
                ...prev,
                pkmnTeam: newTeam,
            };
        });
    };

    return (
        <CommandItem key={p.name} value={p.name} onSelect={(currentValue) => updateSlotChoice(currentValue)}>
            <div className="flex gap-3 items-center">
                <div className="w-10">
                    {sprite && <img src={sprite} alt={p.name} className="h-6 place-content-start" />}
                </div>
                <span className="text-xs">{p.name}</span>
            </div>
            <CheckIcon className={cn("ml-auto", value === p.name ? "opacity-100" : "opacity-0")} />
        </CommandItem>
    );
}
