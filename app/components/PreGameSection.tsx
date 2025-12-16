import { useState } from "react";
import JoinLeave from "./pre_game_section/JoinLeave";
import GameSettings from "./pre_game_section/GameSettings";

function PreGameSection() {
    const [genChoice, setGenChoice] = useState<number>(5);
    const [settingsDone, setSettingsDone] = useState<boolean>(false);
    return (
        <>
            <h1 className="text-7xl font-tanklager font-bold">Game</h1>
            <div className="flex flex-col gap-5">
                {!settingsDone && (
                    <GameSettings genChoice={genChoice} setGenChoice={setGenChoice} setSettingsDone={setSettingsDone} />
                )}
                {settingsDone && <JoinLeave genChoice={genChoice} />}
            </div>
        </>
    );
}

export default PreGameSection;
