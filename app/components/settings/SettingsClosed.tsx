import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import { toast } from "sonner";

export default function SettingsClosed() {
    const clearTeams = async () => {
        try {
            const res = await fetch("/clapped/util/clearTeams", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            });
            if (!res.ok) throw new Error("Failed to clear teams.");
            toast.success(`Removed all players from game`);
        } catch (err) {
            console.error(err);
            toast.error("Error removing all players from game, please try again.");
        }
    };

    return (
        <div className="flex flex-col items-center gap-5">
            <Card className="w-full min-w-xs max-w-sm">
                <CardHeader>
                    <CardTitle className="font-tanklager text-4xl">
                        Sorry! These settings can't be changed now...
                    </CardTitle>
                    <CardDescription className="font-pokemon">
                        Pokémon Level and Generation can only be set when there are 0 players in the game.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-2 items-center">
                    <Link
                        to={"/lobby"}
                        className="font-tanklager text-3xl h-fit pt-4 px-3 pb-2 hover:bg-emerald-300 transition-all"
                    >
                        Lobby
                    </Link>
                    <Link
                        to={"/game"}
                        className="font-tanklager text-3xl h-fit pt-4 px-3 pb-2 hover:bg-emerald-300 transition-all"
                    >
                        Game
                    </Link>
                </CardContent>
                <CardFooter>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button className="font-tanklager text-lg pt-4 pb-2 px-2 w-full bg-red-900">
                                Remove all Players?
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Confirm</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This will delete your player and team from the game.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => clearTeams()}>Continue</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </CardFooter>
            </Card>

            <p className="font-pokemon max-w-sm text-center"></p>
        </div>
    );
}
