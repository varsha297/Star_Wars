import { useQuery } from "@tanstack/react-query";
import { Character } from "../types";

const API_URL = "https://swapi.dev/api/people";

const fetchCharacterDetails = async (id: string): Promise<Character> => {
  const response = await fetch(`${API_URL}/${id}/`);
  if (!response.ok) throw new Error("Failed to fetch character details");
  return response.json();
};

export const useCharacter = (id: string) => {
  return useQuery<Character>({
    queryKey: id ? ["character", id] : [], // Only provide query key if id exists
    queryFn: () => fetchCharacterDetails(id!), // Fetch function
    enabled: !!id, // Prevents query execution if id is missing
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes,
  });
};
