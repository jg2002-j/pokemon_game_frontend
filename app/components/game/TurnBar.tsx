import { useState } from "react";
import PlayerActionCard from "./PlayerActionCard";
import { useGameContext } from "~/contexts/GameContext";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { ArrowBigLeftDash, ArrowBigRightDash } from "lucide-react";
import PokeSprite from "../PokeSprite";
import PokemonHpBar from "../PokemonHpBar";

export default function TurnBar() {
    const { players, team1, team2, playerTurnOpts } = useGameContext();
    const [playerNum, setPlayerNum] = useState<number>(0);

    return (
        players.length > 0 && (
            <>
                <div className="flex gap-20 border">
                    <div id="currentFieldView" className="border w-full flex flex-col gap-5 items-center">
                        <div className="grid grid-cols-3 gap-20 items-center">
                            <div className="flex flex-col gap-2">
                                {team1.map((player) => (
                                    <div key={player.username} className="flex flex-col border w-52">
                                        <div className="flex gap-2">
                                            <img src={player.avatarUrl} alt={player.username} className="h-5" />
                                            <div className="w-full flex justify-between gap-7 items-end">
                                                <p className="font-pokemon uppercase">{player.pokemon.name}</p>
                                                <p className="font-mono text-xs col-start-3">
                                                    {player.pokemon.currentHp}/{player.pokemon.baseStats.HP}
                                                </p>
                                            </div>
                                        </div>
                                        <PokemonHpBar pokemon={player.pokemon} className="h-2 w-full" />
                                    </div>
                                ))}
                            </div>
                            <div className="col-span-2 grid grid-cols-5 gap-2">
                                {team1.map((player) => (
                                    <div key={player.username} className="w-fit border">
                                        <PokeSprite id={player.pokemon.id} containerSize="h-22  " />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-20 items-center">
                            <div className="col-span-2 grid grid-cols-5 gap-2">
                                {team2.map((player) => (
                                    <div key={player.username} className="w-fit border">
                                        <PokeSprite id={player.pokemon.id} containerSize="h-22  " back={true} />
                                    </div>
                                ))}
                            </div>
                            <div className="flex flex-col gap-2">
                                {team2.map((player) => (
                                    <div key={player.username} className="flex flex-col border w-52">
                                        <div className="flex gap-2">
                                            <img src={player.avatarUrl} alt={player.username} className="h-5" />
                                            <div className="w-full flex justify-between gap-7 items-end">
                                                <p className="font-pokemon uppercase">{player.pokemon.name}</p>
                                                <p className="font-mono text-xs col-start-3">
                                                    {player.pokemon.currentHp}/{player.pokemon.baseStats.HP}
                                                </p>
                                            </div>
                                        </div>
                                        <PokemonHpBar pokemon={player.pokemon} className="h-2 w-full" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-5 items-center border">
                        <div id="switchPlayerButtons" className="w-fit flex gap-5 items-center">
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
                        </div>
                        <PlayerActionCard
                            player={players[playerNum]}
                            options={
                                playerTurnOpts.find((opt) => opt.username === players[playerNum].username)?.options
                            }
                        />
                    </div>
                </div>
            </>
        )
    );
}
