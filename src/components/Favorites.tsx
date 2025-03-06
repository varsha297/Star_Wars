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
                            <strong>Height:</strong><span>{char.height}</span>
                        </div>
                        <div className="info-row">
                            <strong>Gender:</strong><span>{char.gender}</span>
                        </div>
                        <div className="info-row">
                            {/* <strong>Home World:</strong><span>{isHomeworldLoading ? "Loading..." : char?.name}</span> */}
                        </div>
                        <p>Height: {char.height}</p>
                        <p>Gender: {char.gender}</p>
                        <button className="btn" onClick={() => removeFavourite(char.url)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Favourites;
