import { useGameContext } from "~/GameContext";

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";

import { PokemonSpriteChoices, type PokemonSpriteChoice } from "~/types/PokemonSpriteChoice";
import { useEffect } from "react";

function SpriteSelector() {
    const { spriteChoice, setSpriteChoice, getSpriteLink } = useGameContext();

    useEffect(() => {
        console.log(spriteChoice);
    }, [spriteChoice]);

    return (
        <div className="flex gap-3 items-center">
            <img src={getSpriteLink(25)} alt="Sprite visualisation" className="max-h-8" />
            <Select
                value={spriteChoice?.toString()}
                onValueChange={(val) => setSpriteChoice(val as PokemonSpriteChoice)}
            >
                <SelectTrigger className="w-64 h-6 text-xs font-pokemon">
                    <SelectValue placeholder="Select a game" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {Object.values(PokemonSpriteChoices).map((s) => (
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

export default SpriteSelector;
