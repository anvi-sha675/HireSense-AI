import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext(undefined);
const STORAGE_KEY = "hiresense-theme";

function getSystemTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => {
    return localStorage.getItem(STORAGE_KEY) || "system";
  });
  const [resolvedTheme, setResolvedTheme] = useState(
    theme === "system" ? getSystemTheme() : theme,
  );

  useEffect(() => {
    const root = document.documentElement;
    const resolved = theme === "system" ? getSystemTheme() : theme;
    root.classList.toggle("dark", resolved === "dark");
    setResolvedTheme(resolved);

    if (theme === "system") {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      const listener = () => {
        const next = getSystemTheme();
        root.classList.toggle("dark", next === "dark");
        setResolvedTheme(next);
      };
      mq.addEventListener("change", listener);
      return () => mq.removeEventListener("change", listener);
    }
  }, [theme]);

  const setTheme = (next) => {
    localStorage.setItem(STORAGE_KEY, next);
    setThemeState(next);
  };

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
