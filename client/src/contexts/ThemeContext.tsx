import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "high-contrast-dark" | "high-contrast-light";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isHighContrast: boolean;
  toggleHighContrast: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem("theme") as Theme;
    return savedTheme || "dark";
  });

  const isHighContrast = theme.includes("high-contrast");

  useEffect(() => {
    const root = document.documentElement;
    
    // Remove all theme classes
    root.classList.remove("dark", "light", "high-contrast-dark", "high-contrast-light");
    
    // Add current theme class
    root.classList.add(theme);
    
    // Save to localStorage
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleHighContrast = () => {
    if (isHighContrast) {
      // Switch back to regular themes
      setTheme(theme.includes("dark") ? "dark" : "light");
    } else {
      // Switch to high contrast version
      setTheme(theme === "dark" ? "high-contrast-dark" : "high-contrast-light");
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        isHighContrast,
        toggleHighContrast,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}