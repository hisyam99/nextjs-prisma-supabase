export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "app-theme";

export const getStoredTheme = (): Theme => {
    if (typeof window === "undefined") return "light";
    return (localStorage.getItem(THEME_STORAGE_KEY) as Theme) || "light";
};
