import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFavourites } from "../context/FavoritesContext";
import { Character } from "../types";
import Loading from "./Loading";
import BackButton from "./BackButton";
import { useFetchMultiple } from "../hooks/useFetchMultiple";
import { useCharacter } from "../hooks/useCharacter";
import { useHomeworld } from "../hooks/useHomeWorld";
import { FaEdit, FaCheck } from "react-icons/fa";

import "../styles/CharacterDetail.scss";
import { useQueryClient } from "@tanstack/react-query";

const CharacterDetails = () => {
    const queryClient = useQueryClient();
    const { addFavourite, favourites } = useFavourites();
    const { id } = useParams<{ id: string }>();

    const { data, isLoading, error } = useCharacter(id!);
    const { data: homeworld, isLoading: isHomeworldLoading } = useHomeworld(data?.homeworld || "");
    const { data: films, isLoading: isFilmsLoading } = useFetchMultiple(data?.films || [], "films");
    const { data: starships, isLoading: isStarshipsLoading } = useFetchMultiple(data?.starships || [], "starships");

    // Local state for editable fields
    const [editableHeight, setEditableHeight] = useState("");
    const [editableGender, setEditableGender] = useState("");
    const [isEditingHeight, setIsEditingHeight] = useState(false);
    const [isEditingGender, setIsEditingGender] = useState(false);

    useEffect(() => {
        if (data) {
            setEditableHeight(data.height || "Unknown");
            setEditableGender(data.gender || "Unknown");
        }
    }, [data]);

    if (isLoading) return <Loading />;
    if (error) return <p role="alert">Error fetching data</p>;

    const isFavourite = favourites.some((fav) => fav.url === (data as Character).url);

    // Function to update React Query cache
    const updateCharacterData = (updatedData: Partial<Character>) => {
        queryClient.setQueryData(["character", id], (oldData: Character | undefined) => ({
            ...oldData,
            ...updatedData,
        }));
    };

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

            {/* Editable Height Field */}
            <div className="info-row">
                <label htmlFor="height-input"><strong>Height:</strong></label>
                {isEditingHeight ? (
                    <>
                        <input
                            id="height-input"
                            type="number"
                            aria-label="Edit height"
                            value={editableHeight}
                            onChange={(e) => setEditableHeight(e.target.value)}
                            className="accessible-input"
                        />
                        <button
                            className="save-btn"
                            data-testid="save-height"
                            aria-label="Save height"
                            onClick={() => {
                                updateCharacterData({ height: editableHeight });
                                setIsEditingHeight(false);
                            }}
                        >
                            <FaCheck />
                        </button>
                    </>
                ) : (
                    <>
                        <span>{editableHeight}</span>
                        <button
                            data-testid="edit-height"
                            className="edit-btn"
                            aria-label="Edit height"
                            onClick={() => setIsEditingHeight(true)}
                        >
                            <FaEdit />
                        </button>
                    </>
                )}
            </div>

            {/* Editable Gender Field */}
            <div className="info-row">
                <label htmlFor="gender-select"><strong>Gender:</strong></label>
                {isEditingGender ? (
                    <>
                        <select
                            id="gender-select"
                            aria-label="Select gender"
                            value={editableGender}
                            onChange={(e) => setEditableGender(e.target.value)}
                            className="accessible-select"
                        >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                        <button
                            className="save-btn"
                            data-testid="save-gender"
                            aria-label="Save gender"
                            onClick={() => {
                                updateCharacterData({ gender: editableGender });
                                setIsEditingGender(false);
                            }}
                        >
                            <FaCheck />
                        </button>
                    </>
                ) : (
                    <>
                        <span>{editableGender}</span>
                        <button
                            data-testid="edit-gender"
                            className="edit-btn"
                            aria-label="Edit gender"
                            onClick={() => setIsEditingGender(true)}
                        >
                            <FaEdit />
                        </button>
                    </>
                )}
            </div>

            <div className="info-row">
                <strong>Homeworld:</strong> <span aria-live="polite">{isHomeworldLoading ? "Loading..." : homeworld?.name}</span>
            </div>

            {/* Display Films */}
            <div>
                <h3>Films</h3>
                {isFilmsLoading ? (
                    <p aria-live="polite">Loading Films...</p>
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
                    <p aria-live="polite">Loading Starships...</p>
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

            {/* Add to Favourites Button */}
            <button
                className="add-fav-btn"
                onClick={() => addFavourite((data as Character))}
                disabled={isFavourite}
                aria-label={isFavourite ? "Added to Favourites" : "Add to Favourites"}
            >
                {isFavourite ? "Added to Favourites" : "Add to Favourites"}
            </button>
        </div>
    );
};

export default CharacterDetails;
