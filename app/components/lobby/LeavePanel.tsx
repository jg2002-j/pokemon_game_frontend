import { useGameContext } from "~/contexts/GameContext";
import { Button } from "../ui/button";
import { toast } from "sonner";
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
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

const TEAM_SIZE = 5;

export default function LeavePanel() {
    const { team1, team2 } = useGameContext();

    const leave = async (username: string) => {
        try {
            const res = await fetch("/clapped/player/leave/" + username, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            });
            if (!res.ok) throw new Error("Failed to remove player.");
            toast.success(`Removed player from game: ${username}`);
        } catch (err) {
            console.error(err);
            toast.error("Error removing player from game, please try again.");
        }
    };

    const renderTeam = (team: typeof team1) => {
        const slots = Array.from({ length: TEAM_SIZE }, (_, index) => (
            <div key={index}>
                {index < team.length ? (
                    <div className="h-44 w-36 border py-3 px-1 rounded flex flex-col gap-2 items-center justify-center">
                        <img src={team[index].avatarUrl} alt={`${team[index].username}-avatar`} className="size-15" />
                        <h4 className="px-1 max-w-full font-pokemon truncate">{team[index].username}</h4>
                        <div className="flex gap-1 items-center px-2">
                            {team[index].pokemonTeam.map((_, index) => (
                                <img
                                    key={index}
                                    src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"
                                    alt="poke-ball"
                                    className="size-4"
                                />
                            ))}
                        </div>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button size={"sm"} className="text-xs h-fit py-px px-2">
                                    Leave
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
                                    <AlertDialogAction onClick={() => leave(team[index].username)}>
                                        Continue
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                ) : (
                    <div className="h-44 w-36 border py-3 px-1 rounded flex items-center justify-center text-gray-400">
                        <img
                            key={index}
                            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"
                            alt="poke-ball"
                            className="size-4 grayscale"
                        />
                    </div>
                )}
            </div>
        ));
        return slots;
    };

    return (
        <div className="flex flex-col gap-10">
            <Card id="choosePokemonTeam" className="h-full">
                <CardHeader>
                    <CardTitle className="font-tanklager text-4xl">Team 1</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-10">
                    <div className="flex gap-2 items-center">{renderTeam(team1)}</div>
                </CardContent>
            </Card>
            <Card id="choosePokemonTeam" className="h-full">
                <CardHeader>
                    <CardTitle className="font-tanklager text-4xl">Team 2</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-10">
                    <div className="flex gap-2 items-center">{renderTeam(team2)}</div>
                </CardContent>
            </Card>
        </div>
    );
}
