import { useState } from "react";

import { ChevronsUpDown } from "lucide-react";

import { Button } from "~/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandList } from "~/components/ui/command";

import type { SimplePokemonDto } from "~/components/pre_game_section/types/SimplePokemonDto";
import PokemonSlotComboboxOption from "./PokemonSlotComboboxOption";
import type { PlayerDto } from "./types/PlayerDto";

interface NewPokemonBoxProps {
    pokeOptions: SimplePokemonDto[];
    player: PlayerDto;
    setPlayer: React.Dispatch<React.SetStateAction<PlayerDto>>;
}

function NewPokemonBox({ pokeOptions, player, setPlayer }: NewPokemonBoxProps) {
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
                        className="font-pokemon text-xs w-full justify-between md:max-w-50"
                    >
                        {value ? pokeOptions.find((p) => p.name === value)?.name.toUpperCase() : "Choose a Pokémon..."}
                        <ChevronsUpDown />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="font-pokemon uppercase text-xs w-(--radix-popover-trigger-width) border-0 p-0">
                    <Command className="**:data-[slot=command-input-wrapper]:h-11">
                        <CommandInput placeholder="Search Pokémon..." />
                        <CommandList className="p-1">
                            <CommandEmpty>No Pokémon found.</CommandEmpty>
                            <CommandGroup>
                                {pokeOptions
                                    .slice()
                                    .sort((a, b) => a.id - b.id)
                                    .map((p) => (
                                        <PokemonSlotComboboxOption
                                            p={p}
                                            value={value}
                                            setValue={setValue}
                                            setOpen={setOpen}
                                        />
                                    ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
}

export default NewPokemonBox;
