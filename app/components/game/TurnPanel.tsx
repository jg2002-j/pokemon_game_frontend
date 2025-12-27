import { useEffect, useState } from "react";
import PlayerActionCard from "./PlayerActionCard";
import { useGameContext } from "~/contexts/GameContext";
import PlayerSwitcher from "./PlayerSwitcher";
import CurrentFieldView from "./CurrentFieldView";

export default function TurnPanel() {
    const { players } = useGameContext();
    const [playerNum, setPlayerNum] = useState<number>(0);

    return (
        players.length > 0 && (
            <>
                <div className="flex flex-col pt-10 gap-10 border items-center">
                    <CurrentFieldView player={players[playerNum]} />
                    <div className="grid grid-cols-3 gap-10 items-start justify-items-center border">
                        <PlayerSwitcher playerNum={playerNum} setPlayerNum={setPlayerNum} />
                        <PlayerActionCard player={players[playerNum]} />
                    </div>
                </div>
            </>
        )
    );
}
