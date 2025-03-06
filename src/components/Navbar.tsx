import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.scss";
import { useFavourites } from "../context/FavoritesContext";
import { FaMoon, FaSun } from "react-icons/fa"; // Icons for theme
import { useTheme } from "../context/ThemeContext";

const Navbar: React.FC = () => {
    const { theme, toggleTheme } = useTheme();
    const { favourites } = useFavourites();
    const favouriteCount = favourites.length;


    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    Star Wars
                </Link>
                <div className="navbar-links">
                    <Link to="/" className="navbar-link">
                        Home
                    </Link>
                    <Link to="/favorites" className="navbar-link favorites-link">
                        Favorites
                        {favouriteCount > 0 && <span className="fav-badge">{favouriteCount}</span>}
                    </Link>
                    {/* Theme Toggle Button */}
                    <button className="theme-toggle-btn" onClick={toggleTheme}>
                        {theme === "light" ? <FaMoon /> : <FaSun data-testid="fa-sun-icon" />}
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;