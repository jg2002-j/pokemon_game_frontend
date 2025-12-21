import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Link } from "react-router";

export default function LobbyClosed() {
    return (
        <div className="flex flex-col items-center gap-5">
            <Card className="w-full min-w-xs max-w-sm">
                <CardHeader>
                    <CardTitle className="font-tanklager text-4xl">
                        Sorry! These settings can't be changed now...
                    </CardTitle>
                    <CardDescription className="font-pokemon">
                        Teams can only be changed before the game starts.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Link
                        to={"/game"}
                        className="w-full font-tanklager text-3xl h-fit pt-4 px-3 pb-2 hover:bg-emerald-300 cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-base ring-offset-white transition-all gap-2 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-main-foreground bg-main border-2 border-border shadow-shadow hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none"
                    >
                        Return to Game
                    </Link>
                </CardContent>
            </Card>
        </div>
    );
}
