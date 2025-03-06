import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CharacterDetails from "../components/CharacterDetails";
import { useFavourites } from "../context/FavoritesContext";
import { useFetchMultiple } from "../hooks/useFetchMultiple";
import { useCharacter } from "../hooks/useCharacter";
import { useHomeworld } from "../hooks/useHomeWorld";

// Mock fetchCharacterDetails, fetchHomeworld, and useFetchMultiple functions
jest.mock("../api", () => ({
    fetchCharacterDetails: jest.fn(),
    fetchHomeworld: jest.fn(),
}));

jest.mock("../context/FavoritesContext", () => ({
    useFavourites: jest.fn(),
}));

jest.mock("../hooks/useFetchMultiple", () => ({
    useFetchMultiple: jest.fn(),
}));

jest.mock("../hooks/useCharacter", () => ({
    useCharacter: jest.fn(),
}));

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


describe("CharacterDetails Component", () => {
    let queryClient: QueryClient;
    beforeEach(() => {
        (useCharacter as jest.Mock).mockReturnValue({
            data: null,
            isLoading: true,
            error: null,
        });

        (useFavourites as jest.Mock).mockReturnValue({
            favourites: [],
            addFavourite: jest.fn(),
        });
        const mockHomeworld = { name: "Tatooine" };
        (useHomeworld as jest.Mock).mockReturnValue({
            data: mockHomeworld,
            isLoading: false,
            error: null,
        });
        const mockFilms = [{ title: "A New Hope" }];
        const mockStarships = [{ name: "X-wing" }];

        (useFetchMultiple as jest.Mock).mockImplementation((_, type) => {
            if (type === "films") return { data: mockFilms, isLoading: false };
            if (type === "starships") return { data: mockStarships, isLoading: false };
            return { data: [], isLoading: false };
        });
        jest.clearAllMocks(); // Reset mocks before each test
        queryClient = createTestQueryClient();

    });

    test("renders character details with loading state", () => {

        render(
            <BrowserRouter>
                <QueryClientProvider client={queryClient}>
                    <CharacterDetails />
                </QueryClientProvider>
            </BrowserRouter>
        );

        expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    });

    test("displays error state", async () => {
        (useCharacter as jest.Mock).mockReturnValue({
            data: "",
            isLoading: false,
            error: new Error("Failed to fetch character details"),
        });

        render(
            <BrowserRouter>
                <QueryClientProvider client={queryClient}>
                    <CharacterDetails />
                </QueryClientProvider>
            </BrowserRouter>
        );

        expect(await screen.findByText(/Error fetching data/i)).toBeInTheDocument();
    });

    test("renders character details", async () => {
        const mockCharacter = {
            name: "Luke Skywalker",
            hair_color: "blond",
            eye_color: "blue",
            gender: "male",
            homeworld: "https://swapi.dev/api/planets/1/",
            films: ["https://swapi.dev/api/films/1/"],
            starships: ["https://swapi.dev/api/starships/12/"],
            url: "https://swapi.dev/api/people/1/",
        };


        (useCharacter as jest.Mock).mockReturnValue({
            data: mockCharacter,
            isLoading: false,
            error: null,
        });


        render(
            <BrowserRouter>
                <QueryClientProvider client={queryClient}>
                    <CharacterDetails />
                </QueryClientProvider>
            </BrowserRouter>
        );
        expect(screen.getByText(/Hair Color:/i)).toBeInTheDocument();
        expect(screen.getByText(/blond/i)).toBeInTheDocument();
        expect(screen.getByText(/Eye Color:/i)).toBeInTheDocument();
        expect(screen.getByText(/blue/i)).toBeInTheDocument();
        expect(screen.getByText(/Gender:/i)).toBeInTheDocument();
        expect(screen.getByText(/male/i)).toBeInTheDocument();
        expect(screen.getByText(/Homeworld:/i)).toBeInTheDocument();
        expect(screen.getByText(/Tatooine/i)).toBeInTheDocument();
        expect(screen.getByText(/Films/i)).toBeInTheDocument();
        expect(screen.getByText(/A New Hope/i)).toBeInTheDocument();
        expect(screen.getByText(/Starships/i)).toBeInTheDocument();
        expect(screen.getByText(/X-wing/i)).toBeInTheDocument();
    });

    test("renders character as favorite", async () => {
        const mockCharacter = {
            name: "Luke Skywalker",
            hair_color: "blond",
            eye_color: "blue",
            gender: "male",
            homeworld: "https://swapi.dev/api/planets/1/",
            films: ["https://swapi.dev/api/films/1/"],
            starships: ["https://swapi.dev/api/starships/12/"],
            url: "https://swapi.dev/api/people/1/",
        };
        (useFavourites as jest.Mock).mockReturnValue({
            favourites: [mockCharacter],
            addFavourite: jest.fn(),
            removeFavourite: jest.fn(),
        });

        (useCharacter as jest.Mock).mockReturnValue({
            data: mockCharacter,
            isLoading: false,
            error: null,
        });

        render(
            <BrowserRouter>
                <QueryClientProvider client={queryClient}>
                    <CharacterDetails />
                </QueryClientProvider>
            </BrowserRouter>
        );

        await waitFor(() => expect(screen.getByText(/Luke Skywalker/i)).toBeInTheDocument());
        expect(screen.getByText(/Added to Favourites/i)).toBeInTheDocument()
    });

    test("calls addFavourite when Add to Favorites button is clicked", async () => {
        const mockCharacter = {
            name: "Luke Skywalker",
            hair_color: "blond",
            eye_color: "blue",
            gender: "male",
            homeworld: "https://swapi.dev/api/planets/1/",
            films: ["https://swapi.dev/api/films/1/"],
            starships: ["https://swapi.dev/api/starships/12/"],
            url: "https://swapi.dev/api/people/1/",
        };
        const addFavouriteMock = jest.fn();

        (useCharacter as jest.Mock).mockReturnValue({
            data: mockCharacter,
            isLoading: false,
            error: null,
        });


        (useFavourites as jest.Mock).mockReturnValue({
            favourites: [],
            addFavourite: addFavouriteMock,
            removeFavourite: jest.fn(),
        });

        render(
            <BrowserRouter>
                <QueryClientProvider client={queryClient}>
                    <CharacterDetails />
                </QueryClientProvider>
            </BrowserRouter>
        );

        await waitFor(() => expect(screen.getByText(/Luke Skywalker/i)).toBeInTheDocument());

        fireEvent.click(screen.getByText(/Add to Favourites/i));
        expect(addFavouriteMock).toHaveBeenCalledWith(mockCharacter);
    });

    test("renders loading state for films", async () => {
        (useFetchMultiple as jest.Mock).mockImplementation((_, type) => {
            if (type === "films") return { data: [], isLoading: true };
            return { data: [], isLoading: false };
        });

        const mockCharacter = {
            name: "Luke Skywalker",
            films: ["https://swapi.dev/api/films/1/"],
        };

        (useCharacter as jest.Mock).mockReturnValue({
            data: mockCharacter,
            isLoading: false,
            error: null,
        });

        render(
            <BrowserRouter>
                <QueryClientProvider client={queryClient}>
                    <CharacterDetails />
                </QueryClientProvider>
            </BrowserRouter>
        );

        await waitFor(() => expect(screen.getByText(/Loading Films.../i)).toBeInTheDocument());
    });

    test("renders no films available state", async () => {
        (useFetchMultiple as jest.Mock).mockImplementation((_, type) => {
            if (type === "films") return { data: [], isLoading: false };
            return { data: [], isLoading: false };
        });

        const mockCharacter = {
            name: "Luke Skywalker",
            films: ["https://swapi.dev/api/films/1/"],
        };

        (useCharacter as jest.Mock).mockReturnValue({
            data: mockCharacter,
            isLoading: false,
            error: null,
        });

        render(
            <BrowserRouter>
                <QueryClientProvider client={queryClient}>
                    <CharacterDetails />
                </QueryClientProvider>
            </BrowserRouter>
        );

        await waitFor(() => expect(screen.getByText(/No Films Available/i)).toBeInTheDocument());
    });

    test("renders loading state for starships", async () => {
        (useFetchMultiple as jest.Mock).mockImplementation((_, type) => {
            if (type === "starships") return { data: [], isLoading: true };
            return { data: [], isLoading: false };
        });

        const mockCharacter = {
            name: "Luke Skywalker",
            starships: ["https://swapi.dev/api/starships/12/"],
        };

        (useCharacter as jest.Mock).mockReturnValue({
            data: mockCharacter,
            isLoading: false,
            error: null,
        });

        render(
            <BrowserRouter>
                <QueryClientProvider client={queryClient}>
                    <CharacterDetails />
                </QueryClientProvider>
            </BrowserRouter>
        );

        await waitFor(() => expect(screen.getByText(/Loading Starships.../i)).toBeInTheDocument());
    });

    test("renders no starships available state", async () => {
        (useFetchMultiple as jest.Mock).mockImplementation((_, type) => {
            if (type === "starships") return { data: [], isLoading: false };
            return { data: [], isLoading: false };
        });

        const mockCharacter = {
            name: "Luke Skywalker",
            starships: ["https://swapi.dev/api/starships/12/"],
        };

        (useCharacter as jest.Mock).mockReturnValue({
            data: mockCharacter,
            isLoading: false,
            error: null,
        });

        render(
            <BrowserRouter>
                <QueryClientProvider client={queryClient}>
                    <CharacterDetails />
                </QueryClientProvider>
            </BrowserRouter>
        );

        await waitFor(() => expect(screen.getByText(/No Starships Available/i)).toBeInTheDocument());
    });

    test("renders loading state for homeworld", async () => {
        (useHomeworld as jest.Mock).mockReturnValue({
            data: null,
            isLoading: true,
            error: null,
        });

        const mockCharacter = {
            name: "Luke Skywalker",
            homeworld: "https://swapi.dev/api/planets/1/",
        };

        (useCharacter as jest.Mock).mockReturnValue({
            data: mockCharacter,
            isLoading: false,
            error: null,
        });

        render(
            <BrowserRouter>
                <QueryClientProvider client={queryClient}>
                    <CharacterDetails />
                </QueryClientProvider>
            </BrowserRouter>
        );

        await waitFor(() => expect(screen.getByText(/Loading.../i)).toBeInTheDocument());
    });
});