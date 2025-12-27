import { CircleAlert } from "lucide-react";
import { cn } from "~/lib/utils";

interface ErrorBoxProps {
    errors: string[];
    className?: string;
}

export default function ErrorBox({ errors, className }: ErrorBoxProps) {
    return (
        <div
            className={cn(
                "text-gray-200 bg-red-900 border-2 border-border shadow-shadow rounded-base text-sm font-base px-5 py-2 flex flex-col gap-1",
                className
            )}
        >
            <div className="flex items-center gap-5">
                <CircleAlert />
                <ul className="list-disc list-inside">
                    <h1 className="font-tanklager text-lg uppercase">Errors</h1>
                    {errors.map((err, index) => (
                        <li key={index}>{err}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
