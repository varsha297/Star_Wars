import { createContext, useContext, useEffect, useState } from "react";

// Define ThemeContext
const ThemeContext = createContext<{ theme: string; toggleTheme: () => void }>({
    theme: "light",
    toggleTheme: () => { },
});

// Theme Provider
export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

// Custom Hook
export const useTheme = () => useContext(ThemeContext);
