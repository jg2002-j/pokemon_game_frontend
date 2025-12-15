import type { PlayerEvent } from "~/types/events/PlayerEvent";

export default function GameEventItem({ event }: { event: PlayerEvent }) {
    return (
        <div className="border p-2 rounded bg-gray-100">
            <p>
                <strong>{event.player.username}</strong> ({event.player.teamNum}) - {event.eventType}
            </p>
            {event.result && <p>{event.result.message}</p>}
            <div className="flex gap-2 mt-1">
                {event.player.pokemonTeam.map((p) => (
                    <div key={p.id} className="flex flex-col items-center">
                        <img src={p.imgLink} alt={p.name} className="w-12 h-12" />
                        <span>{p.name}</span>
                        <span>
                            HP: {p.currentHp} {p.fainted ? "(Fainted)" : ""}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
