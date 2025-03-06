import { Character, CharacterListResponse } from "./types";

const API_URL = "https://swapi.dev/api/people";

export const fetchCharacters = async (
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

export const fetchCharacterDetails = async (id: string): Promise<Character> => {
  const response = await fetch(`${API_URL}/${id}/`);
  if (!response.ok) throw new Error("Failed to fetch character details");
  return response.json();
};

export const searchCharacters = async (query: string) => {
  const response = await fetch(`${API_URL}/?search=${query}`);
  if (!response.ok) throw new Error("Failed to fetch search results");
  const data = await response.json();

  if (!data || !data.results) {
    throw new Error("Invalid API response");
  }

  return data;
};

export const fetchHomeworld = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch homeworld");
  return await response.json();
};
