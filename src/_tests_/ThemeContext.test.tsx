import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeProvider, useTheme } from "../context/ThemeContext";

describe("ThemeContext", () => {
    const TestComponent = () => {
        const { theme, toggleTheme } = useTheme();
        return (
            <div>
                <span>Current theme: {theme}</span>
                <button onClick={toggleTheme}>Toggle Theme</button>
            </div>
        );
    };

    const renderWithThemeProvider = (ui: React.ReactElement) => {
        return render(<ThemeProvider>{ui}</ThemeProvider>);
    };

    test("toggles theme", () => {
        renderWithThemeProvider(<TestComponent />);

        const themeText = screen.getByText(/Current theme:/);
        const toggleButton = screen.getByText("Toggle Theme");

        // Initial theme should be light
        expect(themeText).toHaveTextContent("Current theme: light");

        // Toggle to dark theme
        fireEvent.click(toggleButton);
        expect(themeText).toHaveTextContent("Current theme: dark");

        // Toggle back to light theme
        fireEvent.click(toggleButton);
        expect(themeText).toHaveTextContent("Current theme: light");
    });
});