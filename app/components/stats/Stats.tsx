import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../ui/card";
import { Progress } from "../ui/progress";

export default function Stats() {
    const [topVal, setTopVal] = useState<number>(100);

    const calcPercentageOfTop = (dmg: number) => {
        return (dmg / topVal) * 100;
    };

    return (
        <div>
            <h2 className="font-tanklager text-5xl mb-5">PLAYER STATS</h2>
            <Card className="w-full min-w-xs max-w-sm">
                <CardHeader>
                    <CardTitle className="font-tanklager text-4xl">Damage Dealt</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-x-2 items-center h-full">
                    <p>ExamplePlayer3</p>
                    <Progress value={calcPercentageOfTop(100)} />
                    <p>ExamplePlayer1</p>
                    <Progress value={calcPercentageOfTop(80)} />
                    <p>ExamplePlayer2</p>
                    <Progress value={calcPercentageOfTop(20)} />
                </CardContent>
                <CardFooter className="flex gap-2">
                    <div className="text-gray-500">Placeholder</div>
                </CardFooter>
            </Card>
        </div>
    );
}
