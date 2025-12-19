import type { Pokemon } from "./Pokemon";

export interface Player {
    username: string;
    avatarUrl: string;
    teamNum: number;
    pokemonTeam: Pokemon[];
    activePokemonIndex: number;
    pokemon: Pokemon;
}
