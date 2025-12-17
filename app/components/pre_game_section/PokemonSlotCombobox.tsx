import { useState } from "react";
import { useGameContext } from "~/GameContext";

import { cn } from "~/lib/utils";

import { CheckIcon, ChevronsUpDown } from "lucide-react";

import { Button } from "~/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "~/components/ui/command";

import type { SimplePokemonDto } from "~/types/SimplePokemonDto";

interface PokemonSlotComboboxProps {
    pokeOptions: SimplePokemonDto[];
}

function PokemonSlotCombobox({ pokeOptions }: PokemonSlotComboboxProps) {
    const { getSpriteLink } = useGameContext();
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");
    return (
        <div>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="noShadow"
                        role="combobox"
                        aria-expanded={open}
                        className="font-pokemon uppercase text-xs w-full justify-between md:max-w-50"
                    >
                        {value ? pokeOptions.find((p) => p.name === value)?.name : "Choose a Pokémon..."}
                        <ChevronsUpDown />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="font-pokemon uppercase text-xs w-(--radix-popover-trigger-width) border-0 p-0">
                    <Command className="**:data-[slot=command-input-wrapper]:h-11">
                        <CommandInput placeholder="Search Pokémon..." />
                        <CommandList className="p-1">
                            <CommandEmpty>No Pokémon found.</CommandEmpty>
                            <CommandGroup>
                                {pokeOptions.map((p) => (
                                    <CommandItem
                                        key={p.name}
                                        value={p.name}
                                        onSelect={(currentValue) => {
                                            setValue(currentValue === value ? "" : currentValue);
                                            setOpen(false);
                                        }}
                                    >
                                        <div className="flex gap-3 items-center">
                                            <img src={getSpriteLink(p.id)} alt={p.name} className="h-6 w-6" />
                                            <span className="text-xs">{p.name}</span>
                                        </div>
                                        <CheckIcon
                                            className={cn("ml-auto", value === p.name ? "opacity-100" : "opacity-0")}
                                        />
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
}

export default PokemonSlotCombobox;
