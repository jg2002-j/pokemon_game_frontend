import { useMemo } from "react";
import { useGameContext } from "~/contexts/GameContext";
import { PokemonSprites, type PokemonSpriteChoice } from "~/types/Sprites";

interface PokeSpriteProps {
    id: number;
    scale: number;
    overrideGame?: PokemonSpriteChoice;
}

export default function PokeSprite({ id, scale, overrideGame }: PokeSpriteProps) {
    const { spriteChoice, pkmnGen } = useGameContext();
    const effectiveChoice = overrideGame ?? spriteChoice;

    const imgLink = useMemo(() => {
        const spriteInfo = PokemonSprites[effectiveChoice];

        const isShowdownChoice = effectiveChoice === "Pokémon Showdown";
        const shouldFallback = overrideGame
            ? isShowdownChoice || !spriteInfo
            : isShowdownChoice || !spriteInfo || !(spriteInfo.gen === 0 || spriteInfo.gen >= pkmnGen.number);

        const base = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon";

        return shouldFallback
            ? `${base}/other/showdown/${id}.gif`
            : `${base}/${spriteInfo.path}/${id}.${spriteInfo.animated ? "gif" : "png"}`;
    }, [id, effectiveChoice, overrideGame, pkmnGen.number]);

    const spriteInfo = PokemonSprites[effectiveChoice];
    const size = (spriteInfo?.baseSize ?? 96) * scale;

    return (
        <div className={`border h-[${size}px] aspect-square flex items-center justify-center`}>
            <img src={imgLink} alt="" className="max-w-full max-h-full" />
        </div>
    );
}
