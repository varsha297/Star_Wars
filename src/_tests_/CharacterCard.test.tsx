import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CharacterCard from "../components/CharacterCard";
import { useHomeworld } from "../hooks/useHomeWorld";
import { Character } from "../types";

// Mock useHomeworld hook
jest.mock("../hooks/useHomeWorld", () => ({
    useHomeworld: jest.fn(),
}));

const createTestQueryClient = () =>
    new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
            },
        },
    });

describe("CharacterCard Component", () => {
    let queryClient: QueryClient;
    beforeEach(() => {
        jest.clearAllMocks(); // Reset mocks before each test
        queryClient = createTestQueryClient();
    });

    test("renders character card with loading state", () => {
        const mockCharacter: Character = {
            name: "Luke Skywalker",
            url: "https://swapi.dev/api/people/1/",
            gender: "male",
            homeworld: "https://swapi.dev/api/planets/1/",
            height: "172",
            hair_color: "blond",
            eye_color: "blue",
        };

        (useHomeworld as jest.Mock).mockReturnValue({
            data: null,
            isLoading: true,
            error: null,
        });

        render(
            <BrowserRouter>
                <QueryClientProvider client={queryClient}>
                    <CharacterCard character={mockCharacter} />
                </QueryClientProvider>
            </BrowserRouter>
        );

        expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    });

    test("renders character card with homeworld data", async () => {
        const mockCharacter: Character = {
            name: "Luke Skywalker",
            url: "https://swapi.dev/api/people/1/",
            gender: "male",
            homeworld: "https://swapi.dev/api/planets/1/",
            height: "172",
            hair_color: "blond",
            eye_color: "blue",
        };

        const mockHomeworld = { name: "Tatooine" };

        (useHomeworld as jest.Mock).mockReturnValue({
            data: mockHomeworld,
            isLoading: false,
            error: null,
        });

        render(
            <BrowserRouter>
                <QueryClientProvider client={queryClient}>
                    <CharacterCard character={mockCharacter} />
                </QueryClientProvider>
            </BrowserRouter>
        );

        await waitFor(() => expect(screen.getByText(/Tatooine/i)).toBeInTheDocument());
    });

    test("renders character card with cached homeworld data", async () => {
        const mockCharacter: Character = {
            name: "Luke Skywalker",
            url: "https://swapi.dev/api/people/1/",
            gender: "male",
            homeworld: "https://swapi.dev/api/planets/1/",
            height: "172",
            hair_color: "blond",
            eye_color: "blue",
        };

        const mockHomeworld = { name: "Tatooine" };

        // Set cached data
        queryClient.setQueryData(["homeworld", mockCharacter.homeworld], mockHomeworld);

        (useHomeworld as jest.Mock).mockReturnValue({
            data: mockHomeworld,
            isLoading: false,
            error: null,
        });

        render(
            <BrowserRouter>
                <QueryClientProvider client={queryClient}>
                    <CharacterCard character={mockCharacter} />
                </QueryClientProvider>
            </BrowserRouter>
        );

        await waitFor(() => expect(screen.getByText(/Tatooine/i)).toBeInTheDocument());
    });
});