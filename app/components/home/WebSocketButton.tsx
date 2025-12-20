import { useWebSocket } from "~/contexts/WebSocketContext";

import { CircleCheck, Unplug } from "lucide-react";

import { Button } from "~/components/ui/button";

export default function WebSocketButton() {
    const { connected, connect } = useWebSocket();

    return (
        <div>
            {connected ? (
                <Button variant={"active"}>
                    <CircleCheck /> Connected
                </Button>
            ) : (
                <Button onClick={connect}>
                    <Unplug /> Connect Websocket
                </Button>
            )}
        </div>
    );
}
