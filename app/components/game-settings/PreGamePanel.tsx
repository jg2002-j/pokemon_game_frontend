import { useEffect, useState } from "react";
import JoinLeave from "../game-settings/JoinLeave";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Generations } from "~/types/Generation";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { Label } from "~/components/ui/label";
import { Switch } from "~/components/ui/switch";

function PreGamePanel() {
    const [settingsDone, setSettingsDone] = useState<boolean>(false);
    const [lvlChoice, setLvlChoice] = useState<number>(50);
    const [genChoice, setGenChoice] = useState<number>(5);
    const [iconsChoice, setIconsChoice] = useState<boolean>(false);

    const submitSettings = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await fetch("/settings/update", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    level: lvlChoice,
                    gen: genChoice,
                    useShowdownIcons: iconsChoice,
                }),
            });

            setSettingsDone(true);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <h1 className="text-7xl font-tanklager font-bold">Game</h1>
            <div className="flex flex-col gap-5">
                {!settingsDone && (
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
                                            value={lvlChoice}
                                            onChange={(e) => setLvlChoice(Number(e.target.value))}
                                        />
                                    </CardContent>
                                    <CardFooter className="flex gap-2"></CardFooter>
                                </Card>
                                <Card className="w-full min-w-xs max-w-sm">
                                    <CardHeader>
                                        <CardTitle className="font-tanklager text-4xl">
                                            Set Pokémon Generation
                                        </CardTitle>
                                        <CardDescription className="font-pokemon">
                                            Choose between I and VIII
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <Select
                                            value={genChoice?.toString()}
                                            onValueChange={(val) => setGenChoice(Number(val))}
                                        >
                                            <SelectTrigger className="w-45">
                                                <SelectValue placeholder="Select a generation" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {Object.values(Generations).map((g) => (
                                                        <SelectItem key={g.name} value={String(g.numericalVal)}>
                                                            {g.name.toUpperCase()}
                                                        </SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </CardContent>
                                    <CardFooter className="flex gap-2"></CardFooter>
                                </Card>
                                <Card className="w-full min-w-xs max-w-sm">
                                    <CardHeader>
                                        <CardTitle className="font-tanklager text-4xl">
                                            Use Pokémon Showdown Icons
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex items-center space-x-2">
                                            <Switch
                                                id="showdownIcons"
                                                checked={iconsChoice}
                                                onCheckedChange={setIconsChoice}
                                            />
                                            <Label htmlFor="showdownIcons">Use Showdown Icons</Label>
                                        </div>
                                    </CardContent>
                                    <CardFooter className="flex gap-2"></CardFooter>
                                </Card>
                            </div>
                            <Button type="submit">Submit</Button>
                        </form>
                    </div>
                )}
                {settingsDone && <JoinLeave />}
            </div>
        </>
    );
}

export default PreGamePanel;
