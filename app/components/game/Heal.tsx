import { useState } from "react";
import { Button } from "../ui/button";
import type { Player } from "~/types/Player";

interface HealProps {
    player: Player;
}

export default function Heal({ player }: HealProps) {
    const [healChoice, setHealChoice] = useState<string | null>(null);
    return (
        <>
            <div className="grid grid-cols-2 gap-2">
                <Button onClick={() => setHealChoice("Potion")} className="font-pokemon uppercase">
                    Potion
                </Button>
                <Button onClick={() => setHealChoice("Super Potion")} className="font-pokemon uppercase">
                    Super Potion
                </Button>
                <Button onClick={() => setHealChoice("Full Heal")} className="font-pokemon uppercase">
                    Full Heal
                </Button>
                <Button onClick={() => setHealChoice("Full Restore")} className="font-pokemon uppercase">
                    Full Restore
                </Button>
            </div>
        </>
    );
}
