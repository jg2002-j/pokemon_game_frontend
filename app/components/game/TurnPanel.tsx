import { useState } from "react";
import PlayerActionCard from "./PlayerActionCard";
import { useGameContext } from "~/contexts/GameContext";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { ArrowBigLeftDash, ArrowBigRightDash } from "lucide-react";
import PokeSprite from "../PokeSprite";
import PokemonHpBar from "../PokemonHpBar";
import PlayerSwitcher from "./PlayerSwitcher";
import type { Player } from "~/types/Player";
import CurrentFieldView from "./CurrentFieldView";

export default function TurnPanel() {
    const { players, team1, team2, playerTurnOpts } = useGameContext();
    const [playerNum, setPlayerNum] = useState<number>(0);

    return (
        players.length > 0 && (
            <>
                <div className="flex flex-col gap-10 border">
                    <CurrentFieldView player={players[playerNum]} />
                    <div className="grid grid-cols-3 gap-10 items-start border">
                        <PlayerSwitcher />
                        <PlayerActionCard player={players[playerNum]} />
                    </div>
                </div>
            </>
        )
    );
}
