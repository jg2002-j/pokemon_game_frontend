import React from "react";
import { useGameContext } from "~/contexts/GameContext";
import { Button } from "../ui/button";
import { CircleCheck, CircleDashed } from "lucide-react";

interface PlayerSwitcherProps {
    playerNum: number;
    setPlayerNum: React.Dispatch<React.SetStateAction<number>>;
}

export default function PlayerSwitcher({ playerNum, setPlayerNum }: PlayerSwitcherProps) {
    const { team1, team2, players, playerTurnOpts, queuedActions } = useGameContext();

    return (
        <>
            <div id="switch-player-menu" className="border grid grid-cols-2 gap-5">
                <div id="team-1" className="flex flex-col gap-2">
                    <h3>Team 1</h3>
                    {team1.map((player) => {
                        const options = playerTurnOpts.find((opt) => opt.username === player.username)?.options ?? [];
                        const hasTakenTurn = queuedActions.find((action) => action.username === player.username)
                            ? true
                            : false;
                        const isDisabled = options.includes("NONE") || options.includes("WAIT") || hasTakenTurn;
                        return (
                            <Button
                                disabled={isDisabled}
                                variant={players[playerNum].username === player.username ? "active" : "default"}
                                onClick={() => setPlayerNum(players.findIndex((p) => p.username === player.username))}
                                key={player.username}
                                className="h-fit p-1 pe-2 flex items-center justify-start group w-fit transition-all ease-in-out"
                            >
                                <img src={player.avatarUrl} alt={player.username} className="border h-10" />
                                {hasTakenTurn ? <CircleCheck /> : <CircleDashed />}
                                <p className="hidden group-hover:block font-pokemon">{player.username}</p>
                            </Button>
                        );
                    })}
                </div>
                <div id="team-2" className="flex flex-col gap-2">
                    <h3>Team 1</h3>
                    {team2.map((player) => {
                        const options = playerTurnOpts.find((opt) => opt.username === player.username)?.options ?? [];
                        const hasTakenTurn = queuedActions.find((action) => action.username === player.username)
                            ? true
                            : false;
                        const isDisabled = options.includes("NONE") || options.includes("WAIT") || hasTakenTurn;
                        return (
                            <Button
                                disabled={isDisabled}
                                variant={players[playerNum].username === player.username ? "active" : "default"}
                                onClick={() => setPlayerNum(players.findIndex((p) => p.username === player.username))}
                                key={player.username}
                                className="h-fit p-1 pe-2 flex items-center justify-start group w-fit transition-all ease-in-out"
                            >
                                <img src={player.avatarUrl} alt={player.username} className="border h-10" />
                                {hasTakenTurn ? <CircleCheck /> : <CircleDashed />}
                                <p className="hidden group-hover:block font-pokemon">{player.username}</p>
                            </Button>
                        );
                    })}
                </div>
            </div>
        </>
    );
}
