import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "../components/Navbar";

// Mock useFavourites hook
jest.mock("../context/FavoritesContext", () => ({
    ...jest.requireActual("../context/FavoritesContext"),
    useFavourites: jest.fn(),
}));

// Mock useTheme hook
jest.mock("../context/ThemeContext", () => ({
    ...jest.requireActual("../context/ThemeContext"),
    useTheme: jest.fn(),
}));

import { useFavourites } from "../context/FavoritesContext";
import { useTheme } from "../context/ThemeContext";

describe("Navbar Component", () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Reset mocks before each test
        (useFavourites as jest.Mock).mockReturnValue({ favourites: [] });
        (useTheme as jest.Mock).mockReturnValue({ theme: "light", toggleTheme: jest.fn() });
    });

    test("renders Navbar with Home and Favorites links", () => {
        render(
            <BrowserRouter>
                <Navbar />
            </BrowserRouter>
        );

        expect(screen.getByText(/Home/i)).toBeInTheDocument();
        expect(screen.getByText(/Favorites/i)).toBeInTheDocument();
    });

    test("toggles theme when theme toggle button is clicked", () => {
        const mockToggleTheme = jest.fn();
        (useTheme as jest.Mock).mockReturnValue({ theme: "light", toggleTheme: mockToggleTheme });

        render(
            <BrowserRouter>
                <Navbar />
            </BrowserRouter>
        );

        const themeToggleButton = screen.getByRole("button");
        expect(themeToggleButton).toBeInTheDocument();

        fireEvent.click(themeToggleButton);
        expect(mockToggleTheme).toHaveBeenCalled();
    });

    test("displays correct number of favorites", () => {
        (useFavourites as jest.Mock).mockReturnValue({
            favourites: [{ name: "Luke Skywalker" }],
        });

        render(
            <BrowserRouter>
                <Navbar />
            </BrowserRouter>
        );

        const favBadge = screen.getByText("1");
        expect(favBadge).toBeInTheDocument();
    });

    test("renders FaSun icon when theme is light", () => {
        (useTheme as jest.Mock).mockReturnValue({ theme: "dark", toggleTheme: jest.fn() });

        render(
            <BrowserRouter>
                <Navbar />
            </BrowserRouter>
        );

        const sunIcon = screen.getByTestId("fa-sun-icon");
        expect(sunIcon).toBeInTheDocument();
    });
});
