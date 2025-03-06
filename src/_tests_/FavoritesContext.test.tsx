import { render, screen, fireEvent } from "@testing-library/react";
import { FavouritesProvider, useFavourites } from "../context/FavoritesContext";
import { Character } from "../types";

describe("FavoritesContext", () => {
    const TestComponent = () => {
        const { favourites, addFavourite, removeFavourite } = useFavourites();
        return (
            <div>
                <button onClick={() => addFavourite(mockCharacter)}>Add Favourite</button>
                <button onClick={() => removeFavourite(mockCharacter.url)}>Remove Favourite</button>
                <ul>
                    {favourites.map((char) => (
                        <li key={char.url}>{char.name}</li>
                    ))}
                </ul>
            </div>
        );
    };

    const mockCharacter: Character = {
        name: "Luke Skywalker",
        url: "https://swapi.dev/api/people/1/",
        height: "172",
        gender: "male",
        hair_color: "blond",
        eye_color: "blue",
        homeworld: "https://swapi.dev/api/planets/1/",
    };

    test("adds a character to favourites", () => {
        render(
            <FavouritesProvider>
                <TestComponent />
            </FavouritesProvider>
        );

        const addButton = screen.getByText("Add Favourite");
        fireEvent.click(addButton);

        const listItem = screen.getByText("Luke Skywalker");
        expect(listItem).toBeInTheDocument();
    });

    test("removes a character from favourites", () => {
        render(
            <FavouritesProvider>
                <TestComponent />
            </FavouritesProvider>
        );

        const addButton = screen.getByText("Add Favourite");
        fireEvent.click(addButton);

        const removeButton = screen.getByText("Remove Favourite");
        fireEvent.click(removeButton);

        const listItem = screen.queryByText("Luke Skywalker");
        expect(listItem).not.toBeInTheDocument();
    });

    test("initially has no favourites", () => {
        render(
            <FavouritesProvider>
                <TestComponent />
            </FavouritesProvider>
        );

        const listItem = screen.queryByText("Luke Skywalker");
        expect(listItem).not.toBeInTheDocument();
    });

    test("throws error when useFavourites is used outside of FavouritesProvider", () => {
        const ErrorTestComponent = () => {
            useFavourites();
            return null;
        };

        expect(() => render(<ErrorTestComponent />)).toThrow(
            "useFavourites must be used within a FavouritesProvider"
        );
    });
});