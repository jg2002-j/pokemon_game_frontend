import * as ProgressPrimitive from "@radix-ui/react-progress";
import type { Pokemon } from "~/types/Pokemon";
import { cn } from "~/lib/utils";

interface PokemonHpBarprops {
    pokemon: Pokemon;
    className?: string;
}

export default function PokemonHpBar({ pokemon, className }: PokemonHpBarprops) {
    const hpPercent = Math.max(0, Math.min(100, (pokemon.currentHp / pokemon.baseStats.HP) * 100));

    const getColorClass = (val: number | undefined) => {
        if (val === undefined) return "bg-green-600";
        if (val > 50) return "bg-green-600";
        if (val >= 25) return "bg-yellow-500";
        return "bg-red-600";
    };

    return (
        <ProgressPrimitive.Root
            data-slot="progress"
            className={cn(
                "relative h-3 w-full min-w-15 overflow-hidden rounded-sm border border-border bg-secondary-background",
                className
            )}
        >
            <ProgressPrimitive.Indicator
                data-slot="progress-indicator"
                className={cn("h-full w-[101%] border-r flex-1 border-border transition-all", getColorClass(hpPercent))}
                style={{ transform: `translateX(-${100 - (hpPercent || 0)}%)` }}
            />
        </ProgressPrimitive.Root>
    );
}
