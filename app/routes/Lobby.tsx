import { useEffect } from "react";
import { useSearchParams } from "react-router";
import { toast } from "sonner";
import Toolbar from "~/components/home/Toolbar";
import Lobby from "~/components/lobby/Lobby";

export default function LobbyPage() {
    const [searchParams] = useSearchParams();
    useEffect(() => {
        if (searchParams.get("settingsSaved") === "true") {
            toast.success("Pokémon Level and Generation saved!");
        }
    }, [searchParams]);

    return (
        <>
            <Toolbar />
            <div className="flex flex-col gap-5 border h-screen items-center justify-center">
                <Lobby />
            </div>
        </>
    );
}
