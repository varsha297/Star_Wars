import React from "react";
import "../styles/Loading.scss";

const Loading: React.FC = () => {
    return (
        <div className="loading-container">
            <div className="loading-spinner" role="status"></div>
            <p>Loading...</p>
        </div>
    );
};

export default Loading;