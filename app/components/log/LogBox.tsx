import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "~/components/ui/accordion";
import type { LogMessage } from "~/types/LogMessage";

function LogBox({ msgs }: { msgs: LogMessage[] }) {
    return (
        <div>
            <Accordion defaultValue="logmsgs" type="single" collapsible className="w-full">
                <AccordionItem value="logmsgs">
                    <AccordionTrigger>Log Messages</AccordionTrigger>
                    <AccordionContent>
                        {msgs.map((msg, i) => (
                            <p className="text-xs font-mono" key={i}>
                                <span className="text-gray-500">{msg.timestamp}</span> |{" "}
                                <span className="select-all">{msg.message}</span>
                            </p>
                        ))}
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
}

export default LogBox;
