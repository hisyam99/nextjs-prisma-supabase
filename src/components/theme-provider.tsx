"use client";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useEffect } from "react";
import { themeChange } from "theme-change";
import { getStoredTheme } from "@/lib/themes";

export function ThemeProvider({
  children,
  ...props
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    themeChange(false);
    // Initialize theme-change with stored theme
    const storedTheme = getStoredTheme();
    document.documentElement.setAttribute("data-theme", storedTheme);
  }, []);

  return (
    <NextThemesProvider
      attribute="data-theme"
      defaultTheme={getStoredTheme()}
      enableSystem={false}
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
