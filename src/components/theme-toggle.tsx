"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { Theme, THEME_STORAGE_KEY } from '@/lib/themes';

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const toggleRef = useRef<HTMLInputElement>(null);
  const [mounted, setMounted] = useState(false);

  // Only render component after mount to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Sync the toggle state with the current theme
  useEffect(() => {
    if (toggleRef.current && mounted) {
      toggleRef.current.checked = theme === 'dark';
    }
  }, [theme, mounted]);

  const updateTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  if (!mounted) {
    return null; // Prevent hydration issues by not rendering until client-side
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => updateTheme(theme === 'light' ? 'dark' : 'light')}
      >
        <Sun className="h-[1.5rem] w-[1.3rem] dark:hidden" color="#000" />
        <Moon className="hidden h-5 w-5 dark:block" />
        <span className="sr-only">Toggle theme</span>
      </Button>

      <input
        ref={toggleRef}
        type="checkbox"
        checked={theme === 'dark'}
        className="toggle theme-controller"
        onChange={(e) => {
          updateTheme(e.target.checked ? 'dark' : 'light');
        }}
      />
    </div>
  );
}