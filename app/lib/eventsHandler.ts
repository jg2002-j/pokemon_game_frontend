import { getGenerationFromNum, getGenFromName } from "~/types/Generation";
import type { GameEvent } from "~/types/events/GameEvent";
import type { PlayerEvent } from "~/types/events/PlayerEvent";
import type { TurnActionEvent } from "~/types/events/TurnActionEvent";
import type { TurnInfoEvent } from "~/types/events/TurnInfoEvent";
import type { GameState } from "~/types/GameState";
import type { PlayerTurnOption } from "~/types/PlayerTurnOptions";
import type { useGameContext } from "~/contexts/GameContext";

type AnyEvent = GameEvent | PlayerEvent | TurnActionEvent | TurnInfoEvent;

export const isEvent = (data: any): data is AnyEvent =>
    data && typeof data === "object" && typeof data.eventType === "string";

export const handleEvent = (evt: AnyEvent, gameContext: ReturnType<typeof useGameContext>) => {
    switch (evt.eventType) {
        case "GAME_EVENT":
            handleGameEvent(evt, gameContext);
            break;
        case "PLAYER_EVENT":
            handlePlayerEvent(evt, gameContext);
            break;
        case "TURN_ACTION_EVENT":
            handleTurnActionEvent(evt, gameContext);
            break;
        case "TURN_INFO_EVENT":
            handleTurnInfoEvent(evt, gameContext);
            break;
        default:
            console.warn("Unhandled event type", evt);
    }
};

const handleGameState = (gameState: GameState, gameContext: ReturnType<typeof useGameContext>) => {
    const { logMsg, setPkmnLvl, setPkmnGen, setPlayers } = gameContext;
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

const handleGameEvent = (
    { gameEvtType, newVal, result }: GameEvent,
    gameContext: ReturnType<typeof useGameContext>
) => {
    const { setPkmnLvl, setPkmnGen, setTurnNum, logMsg } = gameContext;
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

const handlePlayerEvent = (
    { playerEvtType, player, result }: PlayerEvent,
    gameContext: ReturnType<typeof useGameContext>
) => {
    const { players, setPlayers, logMsg } = gameContext;
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

const handleTurnActionEvent = (
    { turnActionEvtTypes, affectedPlayer, result }: TurnActionEvent,
    gameContext: ReturnType<typeof useGameContext>
) => {
    const { logMsg } = gameContext;
    // TODO
    logMsg(result.message);
    console.log("Not implemented yet.");
};

const handleTurnInfoEvent = (
    { playerActionOptions, result }: TurnInfoEvent,
    gameContext: ReturnType<typeof useGameContext>
) => {
    const { setPlayerTurnOpts, logMsg } = gameContext;
    const mappedOptions: PlayerTurnOption[] = Object.entries(playerActionOptions).map(([username, options]) => ({
        username,
        options,
    }));
    setPlayerTurnOpts(mappedOptions);
    logMsg(result.message);
};
