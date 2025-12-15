import React from "react";

function GameSettings() {
    return (
        <div>
            <h2 className="font-tanklager text-5xl mb-5">Settings</h2>
            <form className="flex gap-5 items-center">
                <h3 className="font-tanklager text-3xl">Level</h3>
                <h3 className="font-tanklager text-3xl">Generation</h3>
                <h3 className="font-tanklager text-3xl">Use showdown icons</h3>
            </form>
        </div>
    );
}

export default GameSettings;
