export interface PlayerDto {
    username: string;
    avatarUrl: string;
    teamNum: 1 | 2;
    pkmnTeam: [number | null, number | null, number | null, number | null, number | null, number | null];
}
