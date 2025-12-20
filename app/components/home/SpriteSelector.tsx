import { useGameContext } from "~/contexts/GameContext";

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";

import { PokemonSpriteChoices, PokemonSprites, type PokemonSpriteChoice } from "~/types/Sprites";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { checkSpriteOptionIsValidForGen } from "~/lib/sprites";

export default function SpriteSelector() {
    const { spriteChoice, setSpriteChoice, getSprite, pkmnGen, logMsg } = useGameContext();
    const [spriteLink, setSpriteLink] = useState<string | null>(null);

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

    useEffect(() => {
        getSprite(25).then(setSpriteLink);
    }, [getSprite, spriteChoice]);

    return (
        <div className="flex gap-3 items-center">
            {spriteLink && <img src={spriteLink} alt="Sprite visualisation" className="max-h-8" />}
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
