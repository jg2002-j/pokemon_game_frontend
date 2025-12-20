import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useGameContext } from "~/contexts/GameContext";
import type { SimplePokemonDto } from "./types/SimplePokemonDto";
import type { PlayerDto } from "./types/PlayerDto";
import { Button } from "../ui/button";
import { ChevronsUpDown, X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandList } from "~/components/ui/command";
import PokemonSlotComboboxOption from "./PokemonSlotComboboxOption";
import { Badge } from "../ui/badge";

interface ChoosePokemonTeamProps {
    player: PlayerDto;
    setPlayer: React.Dispatch<React.SetStateAction<PlayerDto>>;
}

type SlotIndex = 0 | 1 | 2 | 3 | 4 | 5;

export default function ChoosePokemonTeam({ player, setPlayer }: ChoosePokemonTeamProps) {
    const { pkmnGen, getSprite } = useGameContext();
    const [pokeOptions, setPokeOptions] = useState<SimplePokemonDto[]>([]);

    useEffect(() => {
        const fetchAllPokemon = async () => {
            try {
                const response = await fetch("/clapped/pokemon/validForGen/" + pkmnGen.number, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                });
                const allPkmn: SimplePokemonDto[] = await response.json();
                setPokeOptions(allPkmn.sort((a, b) => a.id - b.id));
            } catch (err) {
                console.error(err);
            }
        };
        fetchAllPokemon();
    }, [pkmnGen]);

    const [activeSlot, setActiveSlot] = useState<SlotIndex>(0);
    const [sprites, setSprites] = useState<string[]>([]);

    const [comboboxOpen, setComboboxOpen] = useState<boolean>(false);
    const [comboboxVal, setComboboxVal] = useState<number | null>(null);

    useEffect(() => {
        const slotValue = player.pkmnTeam[activeSlot];
        setComboboxVal(slotValue);
    }, [activeSlot, player.pkmnTeam]);

    useEffect(() => {
        let cancelled = false;
        const loadSprites = async () => {
            const spritesArray = await Promise.all(
                player.pkmnTeam.map(async (id) => {
                    if (!id) return "";
                    return await getSprite(id);
                })
            );
            if (!cancelled) {
                setSprites(spritesArray);
            }
        };
        loadSprites();
        return () => {
            cancelled = true;
        };
    }, [player.pkmnTeam, pokeOptions, getSprite]);

    return (
        <>
            <div id="pokemonDisplay" className="grid grid-cols-3 gap-3">
                {player.pkmnTeam
                    .map((id) => pokeOptions.find((pOpt) => pOpt.id === id))
                    .map((p, index) => (
                        <Button
                            key={index}
                            variant={activeSlot === index ? "active" : "default"}
                            className="flex flex-col gap-3 items-center h-fit w-36"
                            onClick={(e) => {
                                e.preventDefault();
                                setActiveSlot(index as SlotIndex);
                            }}
                        >
                            <div className="h-10 flex flex-col items-center">
                                {p != null && sprites[index] !== null && sprites[index] !== "" && (
                                    <img src={sprites[index]} alt={p.name} className="h-full place-content-start" />
                                )}
                            </div>
                            <div className="uppercase font-pokemon text-xs">{p != null ? p.name : "--"}</div>
                        </Button>
                    ))}
            </div>
            <div id="pokemonDropdown" className="flex gap-5 justify-center items-center">
                <Badge>{activeSlot + 1}</Badge>
                <Popover open={comboboxOpen} onOpenChange={setComboboxOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="noShadow"
                            role="combobox"
                            aria-expanded={comboboxOpen}
                            className="font-pokemon w-full justify-between md:max-w-78"
                        >
                            {comboboxVal
                                ? pokeOptions.find((p) => p.id === comboboxVal)?.name.toUpperCase()
                                : "Choose a Pokémon..."}
                            <ChevronsUpDown />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="font-pokemon uppercase w-(--radix-popover-trigger-width) border-0 p-0">
                        <Command className="**:data-[slot=command-input-wrapper]:h-11">
                            <CommandInput placeholder="Search Pokémon..." />
                            <CommandList className="p-1">
                                <CommandEmpty>No Pokémon found.</CommandEmpty>
                                <CommandGroup>
                                    {pokeOptions.map((p, index) => (
                                        <div key={index}>
                                            <PokemonSlotComboboxOption
                                                p={p}
                                                value={comboboxVal}
                                                activeSlot={activeSlot}
                                                setPlayer={setPlayer}
                                                setValue={setComboboxVal}
                                                setOpen={setComboboxOpen}
                                            />
                                        </div>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
                <Button
                    size={"icon-sm"}
                    onClick={(e) => {
                        e.preventDefault();
                        setPlayer((prev) => {
                            const newTeam = [...prev.pkmnTeam] as PlayerDto["pkmnTeam"];
                            newTeam[activeSlot] = null;
                            return {
                                ...prev,
                                pkmnTeam: newTeam,
                            };
                        });
                    }}
                >
                    <X />
                </Button>
            </div>
        </>
    );
}
