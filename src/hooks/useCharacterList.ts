import { useQuery } from "@tanstack/react-query";
import { CharacterListResponse } from "../types";

const API_URL = "https://swapi.dev/api/people";

const fetchCharacters = async (
  page: number
): Promise<CharacterListResponse> => {
  const response = await fetch(`${API_URL}?page=${page}`);
  if (!response.ok) throw new Error("Failed to fetch characters");
  const data = await response.json();

  if (!data || !data.results) {
    throw new Error("Invalid API response");
  }

  return data;
};

const searchCharacters = async (query: string) => {
  const response = await fetch(`${API_URL}/?search=${query}`);
  if (!response.ok) throw new Error("Failed to fetch search results");
  const data = await response.json();

  if (!data || !data.results) {
    throw new Error("Invalid API response");
  }

  return data;
};

export const useCharacterList = (page: number, debouncedSearch: string) => {
  return useQuery<CharacterListResponse>({
    queryKey: ["characters", page, debouncedSearch],
    queryFn: async () => {
      try {
        return debouncedSearch
          ? await searchCharacters(debouncedSearch)
          : await fetchCharacters(page);
      } catch (err) {
        console.error("Fetching error:", err);
        return { results: [] };
      }
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes,
  });
};
