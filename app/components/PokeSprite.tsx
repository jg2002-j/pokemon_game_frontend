import { useMemo } from "react";
import { useGameContext } from "~/contexts/GameContext";
import { cn } from "~/lib/utils";
import { PokemonSprites, type PokemonSpriteChoice } from "~/types/Sprites";

interface PokeSpriteProps {
    id: number;
    overrideGame?: PokemonSpriteChoice;
    containerSize?: string;
    imgScale?: string;
    back?: boolean;
}

export default function PokeSprite({ id, overrideGame, containerSize, imgScale, back }: PokeSpriteProps) {
    const { spriteChoice, pkmnGen } = useGameContext();
    const effectiveChoice = overrideGame ?? spriteChoice;

    const imgLink = useMemo(() => {
        const spriteInfo = PokemonSprites[effectiveChoice];

        const isShowdownChoice = effectiveChoice === "Pokémon Showdown";
        const shouldFallback = overrideGame
            ? isShowdownChoice || !spriteInfo
            : isShowdownChoice || !spriteInfo || !(spriteInfo.gen === 0 || spriteInfo.gen >= pkmnGen.number);

        const base = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon";

        if (shouldFallback) {
            return `${base}/other/showdown/${back ? "back/" : ""}${id}.gif`;
        }

        let pathToUse = spriteInfo.path;
        if (back) {
            pathToUse = spriteInfo.backPath ?? "other/showdown/back";
        }
        return `${base}/${pathToUse}/${id}.${spriteInfo.animated ? "gif" : "png"}`;
    }, [id, effectiveChoice, overrideGame, pkmnGen.number, back]);

    const spriteInfo = PokemonSprites[effectiveChoice];
    const defaultImgScale = spriteInfo.defaultScale;

    return (
        <div className={cn("aspect-square flex items-center justify-center", containerSize)}>
            <img
                src={imgLink}
                alt={`Pokemon-${id}`}
                className={cn("max-h-full max-w-full", imgScale ?? defaultImgScale)}
            />
        </div>
    );
}
