import type { Pokemon } from "~/types/Pokemon";
import { Progress } from "./ui/progress";

interface PokemonHpBarprops {
    pokemon: Pokemon;
    className?: string;
}

export default function PokemonHpBar({ pokemon, className }: PokemonHpBarprops) {
    const hpPercent = Math.max(0, Math.min(100, (pokemon.currentHp / pokemon.baseStats.HP) * 100));
    return <Progress value={hpPercent} className={className} />;
}
