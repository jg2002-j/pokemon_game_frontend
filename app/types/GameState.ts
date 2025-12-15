import type { Player } from "./Player";

export interface GameState {
    useShowdownIcons: boolean;
    pokemonLevel: number;
    pokemonGen: string;
    allPlayers: Player[];
}
