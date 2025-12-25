import { useWebSocket } from "~/contexts/WebSocketContext";

import { CircleCheck, Unplug } from "lucide-react";

import { Button } from "~/components/ui/button";

export default function WebSocketButton() {
    const { connected, connect } = useWebSocket();

    return (
        <div>
            {connected ? (
                <Button size={"icon"} variant={"active"}>
                    <CircleCheck />
                </Button>
            ) : (
                <Button onClick={connect}>
                    <Unplug /> Connect to Server
                </Button>
            )}
        </div>
    );
}
