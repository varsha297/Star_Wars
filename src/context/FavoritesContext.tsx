import { createContext, useContext, useState, ReactNode } from "react";
import { Character } from "../types";

type FavouritesContextType = {
  favourites: Character[];
  addFavourite: (char: Character) => void;
  removeFavourite: (url: string) => void;
};

const FavouritesContext = createContext<FavouritesContextType | undefined>(undefined);

export const FavouritesProvider = ({ children }: { children: ReactNode }) => {
  const [favourites, setFavourites] = useState<Character[]>([]);

  const addFavourite = (char: Character) => {
    setFavourites((prev) => [...prev, char]);
  };

  const removeFavourite = (url: string) => {
    setFavourites((prev) => prev.filter((char) => char.url !== url));
  };

  return (

    <FavouritesContext.Provider value={{ favourites, addFavourite, removeFavourite }}>
      {children}
    </FavouritesContext.Provider>
  );
};

export const useFavourites = () => {
  const context = useContext(FavouritesContext);
  if (!context) throw new Error("useFavourites must be used within a FavouritesProvider");
  return context;
};
