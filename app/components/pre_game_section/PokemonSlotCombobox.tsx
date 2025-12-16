import { useState } from "react";

import { cn } from "~/lib/utils";

import { CheckIcon, ChevronsUpDown } from "lucide-react";

import { Button } from "~/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "~/components/ui/command";
import { getSpriteLink } from "~/lib/sprites_handler";

import type { SimplePokemonDto } from "~/types/SimplePokemonDto";

interface PokemonSlotComboboxProps {
    pokeOptions: SimplePokemonDto[];
}

function PokemonSlotCombobox({ pokeOptions }: PokemonSlotComboboxProps) {
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
                                        <img src={getSpriteLink(p.id)} alt={p.name} className="h-8 w-8" />{" "}
                                        <span className="text-xs">{p.name}</span>
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
