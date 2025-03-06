import { useNavigate } from "react-router-dom";
import "../styles/BackButton.scss"; // Optional: Add styling

const BackButton = () => {
    const navigate = useNavigate();

    return (
        <button className="back-button" onClick={() => navigate(-1)}>
            ⬅ Back
        </button>
    );
};

export default BackButton;
