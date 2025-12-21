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
import { useGameContext } from "~/contexts/GameContext";

export default function SettingsClosed() {
    const { players, turnNum } = useGameContext();
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
                        Pokémon Level and Generation can only be set when there are no players in the game and the game
                        hasn't started.
                    </CardDescription>
                </CardHeader>
                {turnNum == null || turnNum < 1 ? (
                    <>
                        <CardContent className="grid grid-cols-2 gap-2 items-center">
                            <Link
                                to={"/lobby"}
                                className="font-tanklager text-3xl h-fit pt-4 px-3 pb-2 hover:bg-emerald-300 cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-base ring-offset-white transition-all gap-2 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-main-foreground bg-main border-2 border-border shadow-shadow hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none"
                            >
                                Lobby
                            </Link>
                            <Link
                                to={"/game"}
                                className="font-tanklager text-3xl h-fit pt-4 px-3 pb-2 hover:bg-emerald-300 cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-base ring-offset-white transition-all gap-2 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-main-foreground bg-main border-2 border-border shadow-shadow hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none"
                            >
                                Game
                            </Link>
                        </CardContent>
                        <CardFooter>
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button className="font-tanklager text-lg pt-4 pb-2 px-2 w-full bg-red-900">
                                        Remove {players.length > 1 && "all"} {players.length}{" "}
                                        {players.length > 1 ? "Players" : "Player"}?
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle className="font-tanklager text-2xl">
                                            Are you sure?
                                        </AlertDialogTitle>
                                        <AlertDialogDescription className="font-pokemon">
                                            This will delete ALL players on both teams from the game.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel className="font-pokemon">Cancel</AlertDialogCancel>
                                        <AlertDialogAction
                                            className="font-pokemon bg-red-900"
                                            onClick={() => clearTeams()}
                                        >
                                            Continue
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </CardFooter>
                    </>
                ) : (
                    <CardContent>
                        <Link
                            to={"/game"}
                            className="w-full font-tanklager text-3xl h-fit pt-4 px-3 pb-2 hover:bg-emerald-300 cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-base ring-offset-white transition-all gap-2 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-main-foreground bg-main border-2 border-border shadow-shadow hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none"
                        >
                            Return to Game
                        </Link>
                    </CardContent>
                )}
            </Card>
        </div>
    );
}
