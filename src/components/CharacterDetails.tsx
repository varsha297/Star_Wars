import { useParams } from "react-router-dom";
import { useFavourites } from "../context/FavoritesContext";
import { Character } from "../types";
import Loading from "./Loading";
import BackButton from "./BackButton";
import { useFetchMultiple } from "../hooks/useFetchMultiple";
import { useCharacter } from "../hooks/useCharacter";
import { useHomeworld } from "../hooks/useHomeWorld";

import "../styles/CharacterDetail.scss";

const CharacterDetails = () => {
    const { addFavourite, favourites } = useFavourites();
    const { id } = useParams<{ id: string }>();


    const { data, isLoading, error } = useCharacter(id!);

    const { data: homeworld, isLoading: isHomeworldLoading } = useHomeworld(data?.homeworld || "");
    // Fetch Films using custom hook
    const { data: films, isLoading: isFilmsLoading } = useFetchMultiple(data?.films || [], "films");

    // Fetch Starships using custom hook
    const { data: starships, isLoading: isStarshipsLoading } = useFetchMultiple(data?.starships || [], "starships");


    if (isLoading) return <Loading />;
    if (error) return <p>Error fetching data</p>;

    const isFavourite = favourites.some((fav) => fav.url === (data as Character).url);

    return (
        <div className="character-details">
            <BackButton />
            <h2>{(data as Character)?.name}</h2>
            <div className="info-row">
                <strong>Hair Color:</strong> <span>{data?.hair_color}</span>
            </div>
            <div className="info-row">
                <strong>Eye Color:</strong> <span>{data?.eye_color}</span>
            </div>
            <div className="info-row">
                <strong>Gender:</strong> <span>{data?.gender}</span>
            </div>
            <div className="info-row">
                <strong>Homeworld:</strong> <span>{isHomeworldLoading ? "Loading..." : homeworld?.name}</span>
            </div>

            {/* Display Films */}
            <div>
                <h3>Films</h3>
                {isFilmsLoading ? (
                    <p>Loading Films...</p>
                ) : films?.length ? (
                    <ul>
                        {films.map((film, index) => (
                            <li key={index}>{film.title}</li>
                        ))}
                    </ul>
                ) : (
                    <p>No Films Available</p>
                )}
            </div>
            {/* Display Starships */}
            <div>
                <h3>Starships</h3>
                {isStarshipsLoading ? (
                    <p>Loading Starships...</p>
                ) : starships?.length ? (
                    <ul>
                        {starships.map((ship, index) => (
                            <li key={index}>{ship.name}</li>
                        ))}
                    </ul>
                ) : (
                    <p>No Starships Available</p>
                )}
            </div>

            <button className="add-fav-btn" onClick={() => addFavourite((data as Character))} disabled={isFavourite}>
                {isFavourite ? "Added to Favourites" : "Add to Favourites"}
            </button>
        </div>
    );
};

export default CharacterDetails;
