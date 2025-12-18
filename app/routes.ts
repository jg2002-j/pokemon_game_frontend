import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/Home.tsx"),
    route("settings", "routes/Settings.tsx"),
    route("lobby", "routes/Lobby.tsx"),
    route("game", "routes/Game.tsx"),
] satisfies RouteConfig;
