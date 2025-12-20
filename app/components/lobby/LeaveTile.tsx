import React from "react";
import type { Player } from "~/types/Player";
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

interface LeaveTileProps {
    player: Player;
    index: number;
}

export default function LeaveTile({ player, index }: LeaveTileProps) {
    const leave = async (username: string) => {
        try {
            const res = await fetch("/clapped/player/leave/" + username, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            });
            if (!res.ok) throw new Error("Failed to remove player.");
            toast.success(`Removed player from game: ${player.username}`);
        } catch (err) {
            console.error(err);
            toast.error("Error removing player from game, please try again.");
        }
    };

    return (
        <div key={index} className="grid grid-cols-6 gap-2 items-center">
            <img src={player.avatarUrl} alt={`${player.username}-avatar`} className="size-12 col-span-1" />
            <h4 className="font-pokemon col-span-2">{player.username}</h4>
            <div className="col-span-2 flex gap-1 items-center px-2">
                {player.pokemonTeam.map((_, index) => (
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
                    <Button size={"sm"} className="col-span-1">
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
                        <AlertDialogAction onClick={() => leave(player.username)}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
