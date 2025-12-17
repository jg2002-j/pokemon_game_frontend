import React, { useState } from "react";

import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";

import { Generations, type Generation, type GenerationName } from "~/types/Generation";
import { useGameContext } from "~/GameContext";

interface GameSettingsProps {
    setSettingsDone: React.Dispatch<React.SetStateAction<boolean>>;
}

function GameSettings({ setSettingsDone }: GameSettingsProps) {
    const { pkmnLvl, setPkmnLvl, pkmnGen, setPkmnGen } = useGameContext();

    const submitSettings = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await fetch("clapped/settings/update", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    level: pkmnLvl,
                    gen: pkmnGen,
                }),
            });
            setSettingsDone(true);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div id="settings" className="mb-10">
            <h2 className="font-tanklager text-5xl mb-5">Settings</h2>
            <form onSubmit={submitSettings} className="flex flex-col gap-5 items-start">
                <div className="grid grid-cols-3 gap-5 items-stretch">
                    <Card className="w-full min-w-xs max-w-sm">
                        <CardHeader>
                            <CardTitle className="font-tanklager text-4xl">Set Pokémon Level</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Input
                                type="number"
                                min={10}
                                max={100}
                                value={pkmnLvl}
                                onChange={(e) => setPkmnLvl(Number(e.target.value))}
                            />
                        </CardContent>
                        <CardFooter className="flex gap-2"></CardFooter>
                    </Card>
                    <Card className="w-full min-w-xs max-w-sm">
                        <CardHeader>
                            <CardTitle className="font-tanklager text-4xl">Set Pokémon Generation</CardTitle>
                            <CardDescription className="font-pokemon">Choose between I and VIII.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Select
                                value={pkmnGen?.name}
                                onValueChange={(val) => {
                                    const key = val as GenerationName;
                                    setPkmnGen(Generations[key]);
                                }}
                            >
                                <SelectTrigger className="w-45">
                                    <SelectValue placeholder="Select a generation" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {Object.values(Generations).map((g) => (
                                            <SelectItem key={g.name} value={g.name}>
                                                {g.name.toUpperCase()}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </CardContent>
                        <CardFooter className="flex gap-2"></CardFooter>
                    </Card>
                </div>
                <Button type="submit">Submit</Button>
            </form>
        </div>
    );
}

export default GameSettings;
