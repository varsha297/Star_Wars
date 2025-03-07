import { useNavigate } from "react-router-dom";
import "../styles/BackButton.scss";
import { FaArrowLeft } from "react-icons/fa";

const BackButton = () => {
    const navigate = useNavigate();

    return (
        <button className="back-button" data-testid="back" onClick={() => navigate(-1)}>
            <FaArrowLeft className="back-icon" /> Back
        </button>
    );
};

export default BackButton;
