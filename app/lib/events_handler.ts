import { useGameContext } from "~/GameContext";
import type { GameEvent } from "~/types/events/GameEvent";
import type { PlayerEvent } from "~/types/events/PlayerEvent";
import type { TurnActionEvent } from "~/types/events/TurnActionEvent";
import type { TurnInfoEvent } from "~/types/events/TurnInfoEvent";
import type { GameState } from "~/types/GameState";
import { type Generation, Generations } from "~/types/Generation";
import type { PlayerTurnOption } from "~/types/PlayerTurnOptions";

export const handleGameState = (gameState: GameState) => {
    const { logMsg, setPkmnLvl, setPkmnGen, setPlayers } = useGameContext();
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
    setPlayers(gameState.allPlayers);
};

export const handleGameEvent = ({ gameEvtType, newVal, result }: GameEvent) => {
    const { setPkmnLvl, setPkmnGen, setTurnNum, logMsg } = useGameContext();
    switch (gameEvtType) {
        case "LEVEL_CHANGE":
            setPkmnLvl(newVal);
            break;
        case "GENERATION_CHANGE":
            setPkmnGen(getGenerationFromNum(newVal));
            break;
        case "TURN_CHANGE":
            setTurnNum(newVal);
            break;
    }
    logMsg(result.message);
};

export const handlePlayerEvent = ({ playerEvtType, player, result }: PlayerEvent) => {
    const { players, setPlayers, logMsg } = useGameContext();
    if (playerEvtType === "JOIN") {
        if (!players.some((p) => p.username === player.username)) {
            setPlayers((prev) => [...prev, player]);
        }
    }
    if (playerEvtType === "LEAVE") {
        setPlayers((prev) => prev.filter((p) => p.username !== player.username));
    }
    logMsg(result.message);
};

export const handleTurnActionEvent = ({ turnActionEvtTypes, affectedPlayer, result }: TurnActionEvent) => {
    const { logMsg } = useGameContext();
    // TODO
    logMsg(result.message);
    console.log("Not implemented yet.");
};

export const handleTurnInfoEvent = ({ playerActionOptions, result }: TurnInfoEvent) => {
    const { setPlayerTurnOpts, logMsg } = useGameContext();
    const mappedOptions: PlayerTurnOption[] = Object.entries(playerActionOptions).map(([username, options]) => ({
        username,
        options,
    }));
    setPlayerTurnOpts(mappedOptions);
    logMsg(result.message);
};

const getGenerationFromNum = (num: number): Generation | undefined => {
    return Object.values(Generations).find((gen) => gen.numericalVal === num);
};

const getGenFromName = (name: string): Generation | undefined => {
    return Object.values(Generations).find((gen) => gen.name === name.toLowerCase());
};
