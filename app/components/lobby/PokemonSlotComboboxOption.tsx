import React, { useEffect, useState } from "react";
import { CommandItem } from "../ui/command";
import { useGameContext } from "~/contexts/GameContext";
import { CheckIcon } from "lucide-react";
import { cn } from "~/lib/utils";
import type { SimplePokemonDto } from "./types/SimplePokemonDto";
import type { PlayerDto } from "./types/PlayerDto";
import PokeSprite from "../PokeSprite";

interface PokemonSlotComboboxOptionProps {
    p: SimplePokemonDto;
    value: number | null;
    activeSlot: number;
    setValue: React.Dispatch<React.SetStateAction<number | null>>;
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
    const updateSlotChoice = (currentValue: number) => {
        setValue(currentValue === value ? null : currentValue);
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
        <CommandItem
            value={p.id.toString()}
            keywords={[p.id.toString(), p.name]}
            onSelect={() => updateSlotChoice(p.id)}
        >
            <div className="flex gap-3 items-center">
                <div className="w-10">
                    <PokeSprite id={p.id} scale={1} />
                </div>
                <span className="text-xs">{p.name}</span>
            </div>
            <CheckIcon className={cn("ml-auto", value === p.id ? "opacity-100" : "opacity-0")} />
        </CommandItem>
    );
}
