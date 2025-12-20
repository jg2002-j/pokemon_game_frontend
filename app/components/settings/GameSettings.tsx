import React from "react";

import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";

import { Generations, type GenerationName } from "~/types/Generation";
import { useGameContext } from "~/contexts/GameContext";
import { toast } from "sonner";

export default function GameSettings() {
    const { pkmnLvl, setPkmnLvl, pkmnGen, setPkmnGen } = useGameContext();

    const submitSettings = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await fetch("/clapped/settings/update", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    level: pkmnLvl,
                    gen: pkmnGen.number,
                }),
            });
            if (!res.ok) {
                throw new Error();
            }
            toast.success(
                `Pokémon Level set to ${pkmnLvl} and Pokémon Generation set to ${pkmnGen.slug.toUpperCase()}.`
            );
        } catch (err) {
            console.error(err);
            toast.error("Error saving game settings, please try again.");
        }
    };

    return (
        <div id="settings">
            <h2 className="font-tanklager text-5xl mb-5">Game Settings</h2>
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
                                value={pkmnGen?.slug}
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
                                            <SelectItem key={g.slug} value={g.slug}>
                                                {g.slug.toUpperCase()}
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
