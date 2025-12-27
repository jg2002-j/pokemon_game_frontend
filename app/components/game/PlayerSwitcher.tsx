import React from "react";
import { useGameContext } from "~/contexts/GameContext";
import { Button } from "../ui/button";
import { CircleCheck, CircleDashed } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "~/components/ui/tooltip";

interface PlayerSwitcherProps {
    playerNum: number;
    setPlayerNum: React.Dispatch<React.SetStateAction<number>>;
}

export default function PlayerSwitcher({ playerNum, setPlayerNum }: PlayerSwitcherProps) {
    const { team1, team2, players, playerTurnOpts, queuedActions } = useGameContext();

    return (
        <>
            <div id="switch-player-menu" className="flex gap-5">
                <div id="team-1" className="flex flex-col gap-2">
                    {team1.map((player) => {
                        const options = playerTurnOpts.find((opt) => opt.username === player.username)?.options ?? [];
                        const hasTakenTurn = queuedActions.find((action) => action.username === player.username)
                            ? true
                            : false;
                        const isDisabled = options.includes("NONE") || options.includes("WAIT") || hasTakenTurn;
                        return (
                            <TooltipProvider key={player.username}>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button
                                            disabled={isDisabled}
                                            variant={
                                                players[playerNum].username === player.username ? "active" : "default"
                                            }
                                            onClick={() =>
                                                setPlayerNum(players.findIndex((p) => p.username === player.username))
                                            }
                                            className="h-fit ps-2 p-1 flex items-center justify-start w-fit"
                                        >
                                            {hasTakenTurn ? <CircleCheck /> : <CircleDashed />}
                                            <img src={player.avatarUrl} alt={player.username} className="h-8" />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent side="right" className="font-pokemon text-sm select-none">
                                        <p className="font-black">{player.username}</p>
                                        <p className="text-xs">{hasTakenTurn ? "Turn queued." : "Turn pending."}</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        );
                    })}
                </div>
                <div id="team-2" className="flex flex-col gap-2">
                    {team2.map((player) => {
                        const options = playerTurnOpts.find((opt) => opt.username === player.username)?.options ?? [];
                        const hasTakenTurn = queuedActions.find((action) => action.username === player.username)
                            ? true
                            : false;
                        const isDisabled = options.includes("NONE") || options.includes("WAIT") || hasTakenTurn;
                        return (
                            <TooltipProvider key={player.username}>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button
                                            disabled={isDisabled}
                                            variant={
                                                players[playerNum].username === player.username ? "active" : "default"
                                            }
                                            onClick={() =>
                                                setPlayerNum(players.findIndex((p) => p.username === player.username))
                                            }
                                            className="h-fit ps-2 p-1 flex items-center justify-start w-fit"
                                        >
                                            {hasTakenTurn ? <CircleCheck /> : <CircleDashed />}
                                            <img src={player.avatarUrl} alt={player.username} className="h-8" />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent side="right" className="font-pokemon text-sm select-none">
                                        <p className="font-black">{player.username}</p>
                                        <p className="text-xs">{hasTakenTurn ? "Turn queued." : "Turn pending."}</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        );
                    })}
                </div>
            </div>
        </>
    );
}
