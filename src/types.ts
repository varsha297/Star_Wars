export type Character = {
  name: string;
  height: string;
  gender: string;
  hair_color: string;
  eye_color: string;
  homeworld: string;
  url: string;
  films?: Array<string>;
  starships?: Array<string>;
};

export type CharacterListResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Character[];
};
