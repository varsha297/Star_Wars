import { useState } from "react";
import { Character } from "../types";
const useFavourites = () => {
  const [favourites, setFavourites] = useState<Character[]>([]);

  const addFavourite = (character: Character) => {
    setFavourites((prev) => [...prev, character]);
  };

  const removeFavourite = (url: string) => {
    setFavourites((prev) => prev.filter((char) => char.url !== url));
  };

  return { favourites, addFavourite, removeFavourite };
};
export default useFavourites;
