import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Favorites from "../components/Favorites";
import { useFavourites } from "../context/FavoritesContext";

// Mock useFavourites hook
jest.mock("../context/FavoritesContext", () => ({
    useFavourites: jest.fn(),
}));

describe("Favorites Component", () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Reset mocks before each test
    });

    test("renders message when there are no favorites", () => {
        (useFavourites as jest.Mock).mockReturnValue({ favourites: [] });

        render(
            <BrowserRouter>
                <Favorites />
            </BrowserRouter>
        );

        expect(screen.getByText(/No favorites added yet./i)).toBeInTheDocument();
    });

    test("renders list of favorite characters", () => {
        const mockFavourites = [
            { name: "Luke Skywalker", url: "https://swapi.dev/api/people/1/" },
            { name: "Darth Vader", url: "https://swapi.dev/api/people/4/" },
        ];

        (useFavourites as jest.Mock).mockReturnValue({ favourites: mockFavourites });

        render(
            <BrowserRouter>
                <Favorites />
            </BrowserRouter>
        );

        expect(screen.getByText(/Your Favorites/i)).toBeInTheDocument();
        expect(screen.getByText(/Luke Skywalker/i)).toBeInTheDocument();
        expect(screen.getByText(/Darth Vader/i)).toBeInTheDocument();
    });


    test("calls removeFavourite when remove button is clicked", () => {
        const mockFavourites = [
            { name: "Luke Skywalker", url: "https://swapi.dev/api/people/1/", height: "172", gender: "male" },
        ];
        const removeFavouriteMock = jest.fn();

        (useFavourites as jest.Mock).mockReturnValue({
            favourites: mockFavourites,
            removeFavourite: removeFavouriteMock,
        });

        render(
            <BrowserRouter>
                <Favorites />
            </BrowserRouter>
        );

        fireEvent.click(screen.getByText(/Remove/i));
        expect(removeFavouriteMock).toHaveBeenCalledWith("https://swapi.dev/api/people/1/");
    });

});