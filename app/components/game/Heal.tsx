import { useState } from "react";
import { Button } from "../ui/button";
import type { Player } from "~/types/Player";
import { toast } from "sonner";
import ErrorBox from "../ErrorBox";

interface HealProps {
    player: Player;
}

export default function Heal({ player }: HealProps) {
    const [healChoice, setHealChoice] = useState<string | null>(null);
    const [errors, setErrors] = useState<string[]>([]);

    const submitHeal = async () => {
        setErrors([]);
        if (healChoice !== null) {
            try {
                const res = await fetch("/clapped/turn/heal/" + player.username + "/" + healChoice, {
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
            setErrors(["You must select a Medicine to use to."]);
        }
    };

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
            {errors.length > 0 && <ErrorBox errors={errors} />}
            <Button disabled={healChoice === null} onClick={() => submitHeal()} className="font-pokemon uppercase">
                Submit
            </Button>
        </>
    );
}
