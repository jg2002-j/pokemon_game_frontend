import { useState } from "react";
import type { Player } from "~/types/Player";
import { Button } from "../ui/button";
import PokeSprite from "../PokeSprite";
import { toast } from "sonner";
import type { Pokemon } from "~/types/Pokemon";
import ErrorBox from "../ErrorBox";

interface SwitchProps {
    player: Player;
}

export default function Switch({ player }: SwitchProps) {
    const [switchIndex, setSwitchIndex] = useState<number | null>(null);
    const [errors, setErrors] = useState<string[]>([]);

    const submitSwitch = async () => {
        setErrors([]);
        if (switchIndex !== null) {
            try {
                const res = await fetch("/clapped/turn/switch/" + player.username + "/" + switchIndex, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                });
                if (!res.ok) {
                    if (res.status === 400) {
                        const errorMsgs = await res.json();
                        setErrors(errorMsgs);
                        errorMsgs.forEach((str: string) => {
                            toast.error(str);
                        });
                    } else {
                        throw new Error();
                    }
                } else {
                    const successMsgs = await res.json();
                    successMsgs.forEach((str: string) => {
                        toast.success(str);
                    });
                }
            } catch (err) {
                console.error(err);
                toast.error("Server-side error submitting action for turn, please try again later.");
            }
        } else {
            setErrors(["You must select a Pokémon to switch to."]);
        }
    };

    const isEligible = (p: Pokemon, newIndex: number) => {
        if (newIndex === player.activePokemonIndex || p.fainted) {
            return false;
        }
        return true;
    };

    return (
        <>
            <div className="grid grid-cols-6 gap-2">
                {player.pokemonTeam.map((p, index) => (
                    <Button
                        key={index}
                        disabled={!isEligible(p, index)}
                        onClick={() => setSwitchIndex(index)}
                        variant={switchIndex !== null && player.pokemonTeam[switchIndex] === p ? "active" : "default"}
                        className="p-2 h-fit text-start"
                        size="sm"
                    >
                        <PokeSprite id={p.id} />
                    </Button>
                ))}
            </div>
            {errors.length > 0 && <ErrorBox errors={errors} />}
            <Button disabled={switchIndex === null} onClick={() => submitSwitch()} className="font-pokemon uppercase">
                Submit
            </Button>
        </>
    );
}
