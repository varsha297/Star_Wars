import { Link } from "react-router-dom";
import { Character } from "../types";
import { useHomeworld } from "../hooks/useHomeWorld";

const CharacterCard: React.FC<{ character: Character }> = ({ character }) => {
    const { data: homeworld, isLoading: isHomeworldLoading } = useHomeworld(character.homeworld);

    return (
        <li className="card">
            <Link
                to={`/character/${character.url.split("/").slice(-2, -1)[0]}`}
                aria-label={`View details for ${character.name}`}
            >
                <h3>{character.name}</h3>
                <div className="info-row">
                    <strong>Gender:</strong>
                    <p>{character.gender}</p>
                </div>
                <div className="info-row">
                    <strong>Home World:</strong>
                    <p>{isHomeworldLoading ? "Loading..." : homeworld?.name}</p>
                </div>
            </Link>
        </li>
    );
};

export default CharacterCard;
