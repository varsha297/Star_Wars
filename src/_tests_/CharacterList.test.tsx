import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CharacterList from "../components/CharacterList";
import { useCharacterList } from "../hooks/useCharacterList";

// Mock fetchCharacters and searchCharacters functions
jest.mock("../api", () => ({
    fetchCharacters: jest.fn(), // Ensure mock returns a valid object
    searchCharacters: jest.fn(),
}));

// Mock useCharacterList hook
jest.mock("../hooks/useCharacterList", () => ({
    useCharacterList: jest.fn(),
}));

const createTestQueryClient = () =>
    new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
            },
        },
    });

describe("CharacterList Component", () => {
    let queryClient: QueryClient;
    beforeEach(() => {
        jest.clearAllMocks(); // Reset mocks before each test
        queryClient = createTestQueryClient();
    });

    test("displays error state", async () => {
        (useCharacterList as jest.Mock).mockReturnValue({
            data: "",
            isLoading: true,
            error: new Error("Failed to fetch characters"),
        });

        render(
            <BrowserRouter>
                <QueryClientProvider client={queryClient}>
                    <CharacterList />
                </QueryClientProvider>
            </BrowserRouter>
        );

        await waitFor(() => expect(screen.getByText(/Error loading characters./i)).toBeInTheDocument());
    });

    test("displays loading state", () => {
        (useCharacterList as jest.Mock).mockReturnValue({
            data: null,
            isLoading: true,
            error: null,
        });

        render(
            <BrowserRouter>
                <QueryClientProvider client={queryClient}>
                    <CharacterList />
                </QueryClientProvider>
            </BrowserRouter>
        );

        expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    });


    test("renders list of characters", async () => {
        const mockCharacters = {
            results: [
                { name: "Luke Skywalker", url: "https://swapi.dev/api/people/1/" },
                { name: "Darth Vader", url: "https://swapi.dev/api/people/4/" },
            ],
            count: 2,
        };

        (useCharacterList as jest.Mock).mockReturnValue({
            data: mockCharacters,
            isLoading: false,
            error: null,
        });

        render(
            <BrowserRouter>
                <QueryClientProvider client={queryClient}>
                    <CharacterList />
                </QueryClientProvider>
            </BrowserRouter>
        );

        await waitFor(() => expect(screen.getByText(/Luke Skywalker/i)).toBeInTheDocument());
        await waitFor(() => expect(screen.getByText(/Darth Vader/i)).toBeInTheDocument());
    });

    test("renders CharacterList with search input and pagination controls", async () => {
        (useCharacterList as jest.Mock).mockReturnValue({
            data: null,
            isLoading: true,
            error: null,
        });

        render(
            <BrowserRouter>
                <QueryClientProvider client={queryClient}>
                    <CharacterList />
                </QueryClientProvider>
            </BrowserRouter>
        );

        expect(screen.getByPlaceholderText(/Search for a character.../i)).toBeInTheDocument();
    });

    test("handles search functionality", async () => {
        const mockSearchResults = {
            results: [
                { name: "Leia Organa", url: "https://swapi.dev/api/people/5/" },
            ],
            count: 1,
        };

        (useCharacterList as jest.Mock).mockReturnValue({
            data: mockSearchResults,
            isLoading: false,
            error: null,
        });

        render(
            <BrowserRouter>
                <QueryClientProvider client={queryClient}>
                    <CharacterList />
                </QueryClientProvider>
            </BrowserRouter>
        );

        const searchInput = screen.getByPlaceholderText(/Search for a character.../i);
        fireEvent.change(searchInput, { target: { value: "Leia" } });

        expect(await screen.findByText(/Leia Organa/i)).toBeInTheDocument();
    });


    test("debounces search input", async () => {
        jest.useFakeTimers();

        const mockSearchResults = {
            results: [
                { name: "Leia Organa", url: "https://swapi.dev/api/people/5/" },
            ],
            count: 1,
        };

        (useCharacterList as jest.Mock).mockReturnValue({
            data: mockSearchResults,
            isLoading: false,
            error: null,
        });

        render(
            <BrowserRouter>
                <QueryClientProvider client={queryClient}>
                    <CharacterList />
                </QueryClientProvider>
            </BrowserRouter>
        );

        const searchInput = screen.getByPlaceholderText(/Search for a character.../i);
        fireEvent.change(searchInput, { target: { value: "Lei" } });
        fireEvent.change(searchInput, { target: { value: "Leia" } });

        // Fast-forward until all timers have been executed
        jest.runAllTimers();

        expect(await screen.findByText(/Leia Organa/i)).toBeInTheDocument();

        jest.useRealTimers();
    });

});