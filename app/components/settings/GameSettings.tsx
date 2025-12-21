import React, { useState } from "react";
import { Form, useNavigate } from "react-router";
import { useGameContext } from "~/contexts/GameContext";
import { toast } from "sonner";

import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";

import { Generations, type Generation, type GenerationName } from "~/types/Generation";
import PokeSprite from "~/components/PokeSprite";
import SettingsClosed from "./SettingsClosed";

export default function GameSettings() {
    const navigate = useNavigate();
    const { pkmnLvl, pkmnGen, players } = useGameContext();
    const [lvlChoice, setLvlChoice] = useState<number>(pkmnLvl);
    const [genChoice, setGenChoice] = useState<Generation>(pkmnGen);

    const submitSettings = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await fetch("/clapped/settings/update", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    level: lvlChoice,
                    gen: genChoice.number,
                }),
            });
            if (!res.ok) {
                throw new Error();
            }
            toast.success(
                `Pokémon Level set to ${pkmnLvl} and Pokémon Generation set to ${pkmnGen.slug.toUpperCase()}.`
            );
            navigate("/lobby");
        } catch (err) {
            console.error(err);
            toast.error("Error saving game settings, please try again.");
        }
    };

    return players.length > 0 ? (
        <SettingsClosed />
    ) : (
        <form id="settings" onSubmit={submitSettings} className="flex flex-col gap-10 items-center">
            <div className="flex gap-5">
                <PokeSprite id={3} containerSize="size-20" overrideGame="Black & White (Animated)" />
                <PokeSprite id={6} containerSize="size-20" overrideGame="Black & White (Animated)" />
                <PokeSprite id={9} containerSize="size-20" overrideGame="Black & White (Animated)" />
            </div>
            <div className="flex gap-5">
                <Card className="w-full min-w-xs max-w-sm">
                    <CardHeader>
                        <CardTitle className="font-tanklager text-4xl">Set Pokémon Level</CardTitle>
                        <CardDescription className="font-pokemon">
                            <strong>Choose between 1 and 100.</strong> This will affect what moves your Pokémon can
                            learn, as well as their stats.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Input
                            className="font-pokemon"
                            type="number"
                            min={10}
                            max={100}
                            value={lvlChoice}
                            onChange={(e) => setLvlChoice(Number(e.target.value))}
                        />
                    </CardContent>
                    <CardFooter className="flex gap-2"></CardFooter>
                </Card>
                <Card className="w-full min-w-xs max-w-sm">
                    <CardHeader>
                        <CardTitle className="font-tanklager text-4xl">Set Pokémon Generation</CardTitle>
                        <CardDescription className="font-pokemon">
                            <strong>Choose between I and VIII.</strong> This will affect which Pokémon you can pick for
                            your team.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Select
                            value={genChoice.slug}
                            onValueChange={(val) => {
                                const key = val as GenerationName;
                                setGenChoice(Generations[key]);
                            }}
                        >
                            <SelectTrigger className="w-full font-pokemon">
                                <SelectValue placeholder="Select a generation" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {Object.values(Generations).map((g) => (
                                        <SelectItem key={g.slug} value={g.slug} className="font-pokemon">
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
            <Button
                type="submit"
                className="font-tanklager text-6xl h-fit pt-6 px-5 pb-4 hover:bg-emerald-300 transition-all"
            >
                Play!
            </Button>
        </form>
    );
}
