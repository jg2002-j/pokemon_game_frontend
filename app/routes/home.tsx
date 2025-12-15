import { useState, useRef, useEffect, useMemo, useContext } from "react";
import type { Route } from "./+types/home";

import Scoreboard from "~/components/scoreboard/Scoreboard";
import LogBox from "~/components/log/LogBox";
import WebSocketButton from "~/components/home/WebSocketButton";
import ManualFetchButton from "~/components/home/ManualFetchButton";
import { Badge } from "~/components/ui/badge";

import type { LogMessage } from "~/types/LogMessage";
import type { Player } from "~/types/Player";
import type { PlayerTurnOption } from "~/types/PlayerTurnOptions";
import type { Generation } from "~/types/Generation";

export function meta({}: Route.MetaArgs) {
    return [{ title: "Pokemon Game YAY" }, { name: "Pokemon Game", content: "Welcome to Pokemon Game!" }];
}

export default function Home() {
    const [logMsgs, setLogMsgs] = useState<LogMessage[]>([]);

    const [pkmnLvl, setPkmnLvl] = useState<number | null>(null);
    const [pkmnGen, setPkmnGen] = useState<Generation | undefined>(undefined);
    const [showdownIcons, setShowdownIcons] = useState<boolean>(false);

    const [turnNum, setTurnNum] = useState<number | null>(null);

    const [players, setPlayers] = useState<Player[]>([]);
    const [playerTurnOpts, setPlayerTurnOpts] = useState<PlayerTurnOption[]>([]);

    const { team1, team2 } = useMemo(() => {
        const team1: Player[] = [];
        const team2: Player[] = [];

        players.forEach((p) => {
            const team = p.teamNum === 1 ? team1 : team2;
            if (!team.some((player) => player.username === p.username)) {
                team.push(p);
            }
        });

        const sortByUsername = (a: Player, b: Player) =>
            a.username.localeCompare(b.username, undefined, { sensitivity: "base" });

        team1.sort(sortByUsername);
        team2.sort(sortByUsername);

        return { team1, team2 };
    }, [players]);

    const logMsg = (msg: string) => {
        console.log(msg);
        const timestamp = new Date().toLocaleTimeString();
        const logEntry: LogMessage = { timestamp, message: msg };
        setLogMsgs((prev) => [...prev, logEntry]);
    };

    return (
        <div className="p-5 flex flex-col gap-5">
            <div className="flex justify-between items-center gap-5">
                <div className="flex gap-5">
                    <WebSocketButton
                        logMsg={logMsg}
                        setPkmnLvl={setPkmnLvl}
                        setPkmnGen={setPkmnGen}
                        setShowdownIcons={setShowdownIcons}
                        players={players}
                        setPlayers={setPlayers}
                        setPlayerTurnOpts={setPlayerTurnOpts}
                        setTurnNum={setTurnNum}
                    />
                    <ManualFetchButton
                        logMsg={logMsg}
                        setPkmnLvl={setPkmnLvl}
                        setPkmnGen={setPkmnGen}
                        setShowdownIcons={setShowdownIcons}
                        setPlayers={setPlayers}
                    />
                </div>
                <div className="flex gap-5 select-none">
                    <div className="flex items-center gap-2">
                        <span className="font-bold text-lg">Turn</span>
                        <Badge>{turnNum}</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="font-bold text-lg">Level</span>
                        <Badge>{pkmnLvl}</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="font-bold text-lg">Generation</span>
                        <Badge>{pkmnGen?.name.toUpperCase()}</Badge>
                    </div>
                </div>
            </div>
            <Scoreboard team1={team1} team2={team2} pkmnGen={pkmnGen} showdownIcons={showdownIcons} />
            <LogBox msgs={logMsgs} />
        </div>
    );
}
