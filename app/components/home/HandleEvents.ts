import type { GameEvent } from "~/types/events/GameEvent";
import type { PlayerEvent } from "~/types/events/PlayerEvent";
import type { TurnActionEvent } from "~/types/events/TurnActionEvent";
import type { TurnInfoEvent } from "~/types/events/TurnInfoEvent";
import type { GameState } from "~/types/GameState";
import { type Generation, Generations } from "~/types/Generation";
import type { Player } from "~/types/Player";
import type { PlayerTurnOption } from "~/types/PlayerTurnOptions";

export const handleGameState = (
    logMsg: (msg: string) => void,
    gameState: GameState,
    setPkmnLvl: React.Dispatch<React.SetStateAction<number | null>>,
    setPkmnGen: React.Dispatch<React.SetStateAction<Generation | undefined>>,
    setShowdownIcons: React.Dispatch<React.SetStateAction<boolean>>,
    setPlayers: React.Dispatch<React.SetStateAction<Player[]>>
) => {
    logMsg(
        "Fetched current gameState -> GEN: [" +
            gameState.pokemonGen +
            "], LVL: [" +
            gameState.pokemonLevel +
            "], UseShowdownIcons: [" +
            gameState.useShowdownIcons +
            "], Players: [" +
            gameState.allPlayers
                .sort((a, b) => a.username.localeCompare(b.username, undefined, { sensitivity: "base" }))
                .map((p) => p.username)
                .join(", ") +
            "]"
    );
    setPkmnLvl(gameState.pokemonLevel);
    setPkmnGen(getGenFromName(gameState.pokemonGen));
    setShowdownIcons(gameState.useShowdownIcons);
    setPlayers(gameState.allPlayers);
};

export const handleGameEvent = (
    { gameEvtType, newVal }: GameEvent,
    setPkmnLvl: React.Dispatch<React.SetStateAction<number | null>>,
    setPkmnGen: React.Dispatch<React.SetStateAction<Generation | undefined>>,
    setTurnNum: React.Dispatch<React.SetStateAction<number | null>>
) => {
    switch (gameEvtType) {
        case "LEVEL_CHANGE":
            setPkmnLvl(newVal);
            break;
        case "GENERATION_CHANGE":
            setPkmnGen(getGenerationFromNum(newVal));
        case "TURN_CHANGE":
            setTurnNum(newVal);
    }
};

export const handlePlayerEvent = (
    { playerEvtType, player }: PlayerEvent,
    players: Player[],
    setPlayers: React.Dispatch<React.SetStateAction<Player[]>>
) => {
    if (playerEvtType === "JOIN") {
        if (!players.some((p) => p.username === player.username)) {
            setPlayers((prev) => [...prev, player]);
        }
    }
    if (playerEvtType === "LEAVE") {
        setPlayers((prev) => prev.filter((p) => p.username !== player.username));
    }
};

export const handleTurnActionEvent = ({ turnActionEvtTypes, affectedPlayer }: TurnActionEvent) => {
    // TODO
    console.log("Not implemented yet.");
};

export const handleTurnInfoEvent = (
    { playerActionOptions }: TurnInfoEvent,
    setPlayerTurnOpts: React.Dispatch<React.SetStateAction<PlayerTurnOption[]>>
) => {
    const mappedOptions: PlayerTurnOption[] = Object.entries(playerActionOptions).map(([username, options]) => ({
        username,
        options,
    }));
    setPlayerTurnOpts(mappedOptions);
};

const getGenerationFromNum = (num: number): Generation | undefined => {
    return Object.values(Generations).find((gen) => gen.numericalVal === num);
};

const getGenFromName = (name: string): Generation | undefined => {
    return Object.values(Generations).find((gen) => gen.name === name.toLowerCase());
};
