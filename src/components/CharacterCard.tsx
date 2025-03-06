import { Link } from "react-router-dom";
import { Character } from "../types";
import { useHomeworld } from "../hooks/useHomeWorld";

const CharacterCard: React.FC<{ character: Character }> = ({ character }) => {
    const { data: homeworld, isLoading: isHomeworldLoading } = useHomeworld(character.homeworld);

    return (
        <li className="card">
            <Link to={`/character/${character.url.split("/").slice(-2, -1)[0]}`}>
                <h3>{character.name}</h3>
                <div className="info-row">
                    <strong>Gender:</strong><span>{character.gender}</span>
                </div>
                <div className="info-row">
                    <strong>Home World:</strong><span>{isHomeworldLoading ? "Loading..." : homeworld?.name}</span>
                </div>
            </Link>
        </li >
    );
};


export default CharacterCard