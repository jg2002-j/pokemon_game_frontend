import GameSettings from "~/components/settings/GameSettings";

export default function SettingsPage() {
    return (
        <div className="p-5 flex flex-col gap-10 pt-24">
            <GameSettings />
        </div>
    );
}
