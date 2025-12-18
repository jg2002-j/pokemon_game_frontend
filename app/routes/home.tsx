import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
    return [{ title: "Pokemon Game YAY" }, { name: "Pokemon Game", content: "Welcome to Pokemon Game!" }];
}

export default function Home() {
    return <div className="p-5 flex flex-col gap-10 pt-24"></div>;
}
