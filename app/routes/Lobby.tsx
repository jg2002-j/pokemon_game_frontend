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
            <div className="p-5 flex flex-col gap-10 mt-30">
                <Lobby />
            </div>
        </>
    );
}
