import { useMemo } from "react";
import { useGameContext } from "~/contexts/GameContext";
import { PokemonSprites } from "~/types/Sprites";

interface PokeSpriteProps {
    id: number;
    scale: number;
}

export default function PokeSprite({ id, scale }: PokeSpriteProps) {
    const { spriteChoice, pkmnGen } = useGameContext();
    const imgLink = useMemo(() => {
        const spriteInfo = PokemonSprites[spriteChoice];

        const isShowdownChoice = spriteChoice === "Pokémon Showdown";
        const shouldFallback =
            isShowdownChoice || !spriteInfo || !(spriteInfo.gen === 0 || spriteInfo.gen >= pkmnGen.number);

        const base = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon";

        return shouldFallback
            ? `${base}/other/showdown/${id}.gif`
            : `${base}/${spriteInfo.path}/${id}.${spriteInfo.animated ? "gif" : "png"}`;
    }, [id, spriteChoice, pkmnGen.number]);

    const size = PokemonSprites[spriteChoice].baseSize * scale;

    return (
        <div className={`border h-[${size}px] aspect-square flex items-center justify-center`}>
            <img src={imgLink} alt="" className="max-w-full max-h-full" />
        </div>
    );
}
