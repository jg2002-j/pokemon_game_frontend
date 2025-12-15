import type { LogMessage } from "~/types/LogMessage";
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
import { Logs } from "lucide-react";

function LogBoxButton({ msgs }: { msgs: LogMessage[] }) {
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
                    <div className="px-4 grid grid-cols-6 gap-x-5 gap-y-3 text-xs font-mono">
                        {msgs.map((msg, i) => (
                            <>
                                <p key={`${i}-timestamp`} className="text-gray-500 col-span-1">
                                    {msg.timestamp}
                                </p>
                                <p key={`${i}-msg`} className="select-all col-span-5">
                                    {msg.message}
                                </p>
                            </>
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

export default LogBoxButton;
