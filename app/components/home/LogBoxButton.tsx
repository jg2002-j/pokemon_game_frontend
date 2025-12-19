import { useGameContext } from "~/contexts/GameContext";

import { Logs } from "lucide-react";

import { Button } from "~/components/ui/button";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "~/components/ui/sheet";

export default function LogBoxButton() {
    const { logs } = useGameContext();
    return (
        <div>
            <Sheet>
                <SheetTrigger asChild>
                    <Button>
                        <Logs /> Open Logs
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="min-w-150">
                    <SheetHeader>
                        <SheetTitle>Log Messages</SheetTitle>
                    </SheetHeader>
                    <div className="px-4 flex flex-col gap-y-3 text-xs font-mono">
                        {logs.map((msg, i) => (
                            <div key={i} className="grid grid-cols-6 gap-x-5 ">
                                <p className="text-gray-500 col-span-1">{msg.timestamp}</p>
                                <p className="select-all col-span-5">{msg.message}</p>
                            </div>
                        ))}
                    </div>
                    <SheetFooter>
                        <SheetClose asChild>
                            <Button variant="neutral">Close</Button>
                        </SheetClose>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </div>
    );
}
