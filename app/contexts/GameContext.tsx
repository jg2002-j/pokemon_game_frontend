import { type ReactNode, useState, useContext, createContext, useMemo } from "react";
import { getCroppedSprite } from "../lib/sprites";
import { Generations, type Generation } from "../types/Generation";
import type { LogMessage } from "../types/LogMessage";
import type { Player } from "../types/Player";
import type { PlayerTurnOption } from "../types/PlayerTurnOptions";
import type { PokemonSpriteChoice } from "../types/Sprites";

interface GameContextType {
    logs: LogMessage[];
    logMsg: (msg: string) => void;

    pkmnLvl: number;
    setPkmnLvl: React.Dispatch<React.SetStateAction<number>>;

    pkmnGen: Generation;
    setPkmnGen: React.Dispatch<React.SetStateAction<Generation>>;

    spriteChoice: PokemonSpriteChoice;
    setSpriteChoice: React.Dispatch<React.SetStateAction<PokemonSpriteChoice>>;
    getSprite: (pkmnId: number) => Promise<string>;

    turnNum: number | null;
    setTurnNum: React.Dispatch<React.SetStateAction<number | null>>;

    players: Player[];
    setPlayers: React.Dispatch<React.SetStateAction<Player[]>>;

    playerTurnOpts: PlayerTurnOption[];
    setPlayerTurnOpts: React.Dispatch<React.SetStateAction<PlayerTurnOption[]>>;

    team1: Player[];
    team2: Player[];
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
    const [logs, setLogs] = useState<LogMessage[]>([]);

    const [pkmnLvl, setPkmnLvl] = useState<number>(50);
    const [pkmnGen, setPkmnGen] = useState<Generation>(Generations.v);
    const [spriteChoice, setSpriteChoice] = useState<PokemonSpriteChoice>("Black & White");

    const [turnNum, setTurnNum] = useState<number | null>(null);
    const [players, setPlayers] = useState<Player[]>([]);
    const [playerTurnOpts, setPlayerTurnOpts] = useState<PlayerTurnOption[]>([]);

    const logMsg = (msg: string) => {
        console.log(msg);
        const timestamp = new Date().toLocaleTimeString();
        const logEntry: LogMessage = { timestamp, message: msg };
        setLogs((prev) => [...prev, logEntry]);
    };

    const getSprite = async (pkmnId: number) => {
        return getCroppedSprite(pkmnId, spriteChoice, pkmnGen);
    };

    const { team1, team2 } = useMemo(() => {
        const t1: Player[] = [];
        const t2: Player[] = [];

        players.forEach((p) => {
            const team = p.teamNum === 1 ? t1 : t2;
            if (!team.some((player) => player.username === p.username)) {
                team.push(p);
            }
        });

        const sortByUsername = (a: Player, b: Player) =>
            a.username.localeCompare(b.username, undefined, { sensitivity: "base" });

        t1.sort(sortByUsername);
        t2.sort(sortByUsername);

        return { team1: t1, team2: t2 };
    }, [players]);

    return (
        <GameContext.Provider
            value={{
                logs,
                logMsg,
                pkmnLvl,
                setPkmnLvl,
                pkmnGen,
                setPkmnGen,
                spriteChoice,
                setSpriteChoice,
                getSprite,
                turnNum,
                setTurnNum,
                players,
                setPlayers,
                playerTurnOpts,
                setPlayerTurnOpts,
                team1,
                team2,
            }}
        >
            {children}
        </GameContext.Provider>
    );
};

export const useGameContext = () => {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error("useGameContext must be used within a GameProvider");
    }
    return context;
};
