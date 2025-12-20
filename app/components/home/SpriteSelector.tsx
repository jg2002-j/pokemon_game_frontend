import { useEffect } from "react";
import { useGameContext } from "~/contexts/GameContext";

import { toast } from "sonner";

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import PokeSprite from "~/components/PokeSprite";

import { PokemonSpriteChoices, PokemonSprites, type PokemonSpriteChoice } from "~/types/Sprites";
import type { Generation } from "~/types/Generation";

export default function SpriteSelector() {
    const { spriteChoice, setSpriteChoice, pkmnGen, logMsg } = useGameContext();

    const checkSpriteOptionIsValidForGen = (val: PokemonSpriteChoice, pkmnGen: Generation) => {
        return PokemonSprites[val].gen === 0 || PokemonSprites[val].gen >= pkmnGen.number;
    };

    const updateSpriteChoice = (val: PokemonSpriteChoice) => {
        if (checkSpriteOptionIsValidForGen(val, pkmnGen)) {
            setSpriteChoice(val);
            toast.success("Pokémon sprites updated to " + val);
            logMsg("Pokémon sprites to " + val);
        } else {
            toast.error(
                "This isn't a valid choice. Please choose a game that is in Generation " +
                    pkmnGen.slug.toUpperCase() +
                    " or later."
            );
        }
    };

    useEffect(() => {
        if (!checkSpriteOptionIsValidForGen(spriteChoice, pkmnGen)) {
            updateSpriteChoice("Pokémon Showdown");
        }
    }, [spriteChoice, pkmnGen]);

    return (
        <div className="flex gap-3 items-center">
            <PokeSprite id={25} scale={1} />
            <Select
                value={spriteChoice?.toString()}
                onValueChange={(val) => updateSpriteChoice(val as PokemonSpriteChoice)}
            >
                <SelectTrigger className="w-64 h-6 text-xs font-pokemon">
                    <SelectValue placeholder="Select a game" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {Object.values(PokemonSpriteChoices)
                            .filter((s) => checkSpriteOptionIsValidForGen(s, pkmnGen))
                            .map((s) => (
                                <SelectItem key={s} value={s} className="font-pokemon text-xs">
                                    <span>{s}</span>
                                </SelectItem>
                            ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
}
