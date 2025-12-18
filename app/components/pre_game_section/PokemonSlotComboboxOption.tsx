import React, { useEffect, useState } from "react";
import { CommandItem } from "../ui/command";
import { useGameContext } from "~/GameContext";
import type { SimplePokemonDto } from "~/components/pre_game_section/types/SimplePokemonDto";
import { CheckIcon } from "lucide-react";
import { cn } from "~/lib/utils";

interface PokemonSlotComboboxOptionProps {
    p: SimplePokemonDto;
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function PokemonSlotComboboxOption({ p, value, setValue, setOpen }: PokemonSlotComboboxOptionProps) {
    const { getSprite } = useGameContext();

    const [sprite, setSprite] = useState<string | null>(null);

    useEffect(() => {
        getSprite(p.id).then(setSprite);
    }, [getSprite, sprite]);

    return (
        <>
            <CommandItem
                key={p.name}
                value={p.name}
                onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                }}
            >
                <div className="flex gap-3 items-center">
                    <div className="w-10">
                        {sprite && <img src={sprite} alt={p.name} className="h-6 place-content-start" />}
                    </div>
                    <span className="text-xs">{p.name}</span>
                </div>
                <CheckIcon className={cn("ml-auto", value === p.name ? "opacity-100" : "opacity-0")} />
            </CommandItem>
        </>
    );
}

export default PokemonSlotComboboxOption;
