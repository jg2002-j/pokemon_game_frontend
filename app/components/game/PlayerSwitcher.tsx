import React from "react";
import { useGameContext } from "~/contexts/GameContext";
import { Button } from "../ui/button";

export default function PlayerSwitcher() {
    const { team1, team2, players, playerTurnOpts } = useGameContext();

    return (
        <div>
            {/* <div id="switch-player-buttons" className="border w-fit flex gap-5 items-center">
                            <Button
                                className=""
                                size={"icon"}
                                disabled={playerNum === 0}
                                onClick={() => {
                                    if (playerNum - 1 >= 0) {
                                        setPlayerNum(playerNum - 1);
                                    }
                                }}
                            >
                                <ArrowBigLeftDash />
                            </Button>
                            <Badge className="w-sm text-lg font-black font-pokemon truncate">
                                {players[playerNum].username}
                            </Badge>
                            <Button
                                className=""
                                size={"icon"}
                                disabled={playerNum === players.length - 1}
                                onClick={() => {
                                    if (playerNum + 1 < players.length) {
                                        setPlayerNum(playerNum + 1);
                                    }
                                }}
                            >
                                <ArrowBigRightDash />
                            </Button>
                        </div> */}
            <div id="switch-player-menu" className="border flex gap-5">
                <div className="flex flex-col gap-2">
                    {team1.map((player) => {
                        const options = playerTurnOpts.find((opt) => opt.username === player.username)?.options ?? [];
                        const isDisabled = options.includes("NONE") || options.includes("WAIT");
                        return (
                            <Button disabled={isDisabled} key={player.username} className="h-fit w-fit p-1 group">
                                <img src={player.avatarUrl} alt={player.username} className="border h-10" />
                                <div className="w-0 overflow-hidden group-hover:w-fit transition-all ease-in-out">
                                    {player.username}
                                </div>
                            </Button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
