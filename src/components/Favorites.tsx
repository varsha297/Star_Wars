import { useFavourites } from "../context/FavoritesContext";
import "../styles/Favourites.scss";

const Favourites = () => {
    const { favourites, removeFavourite } = useFavourites();

    if (favourites.length === 0) {
        return <p>No favorites added yet.</p>;
    }

    return (
        <div className="favourites">
            <h2>Your Favorites</h2>
            <ul className="list">
                {favourites.map((char) => (
                    <li key={char.url} className="card">
                        <h3>{char.name}</h3>
                        <div className="info-row">
                            <strong>Height:</strong>
                            <p>{char.height}</p>
                        </div>
                        <div className="info-row">
                            <strong>Gender:</strong>
                            <p>{char.gender}</p>
                        </div>
                        <button
                            className="btn"
                            onClick={() => removeFavourite(char.url)}
                            aria-label={`Remove ${char.name} from favourites`}
                        >
                            Remove
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Favourites;
