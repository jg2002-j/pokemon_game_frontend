import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";

type ThemeProviderProps = {
    children: React.ReactNode;
};

type ThemeProviderState = {
    theme: Theme;
    setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
    theme: "light",
    setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({ children }: ThemeProviderProps) {
    const [theme, setTheme] = useState<Theme>("light");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

        const updateTheme = () => {
            setTheme(mediaQuery.matches ? "dark" : "light");
        };

        updateTheme();
        setMounted(true);

        mediaQuery.addEventListener("change", updateTheme);
        return () => mediaQuery.removeEventListener("change", updateTheme);
    }, []);

    useEffect(() => {
        if (!mounted) return;
        const root = document.documentElement;
        root.classList.remove("light", "dark");
        root.classList.add(theme);
    }, [theme, mounted]);

    if (!mounted) {
        return null;
    }

    return <ThemeProviderContext.Provider value={{ theme, setTheme }}>{children}</ThemeProviderContext.Provider>;
}

export const useTheme = () => {
    const context = useContext(ThemeProviderContext);

    if (context === undefined) throw new Error("useTheme must be used within a ThemeProvider");

    return context;
};
