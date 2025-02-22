import React from "react";
import "./Card.css";

function Card({ imageUrl, readingTime, title })
{
    return (
        <div className="card">
            <div className="card-overlay">
                <div className="card-info">
                    {readingTime && (
                        <span className="reading-time">
                            <i className="clock-icon">🕒</i> {readingTime} minutes of reading
                        </span>
                    )}
                </div>
                <img src={imageUrl} alt="Card" className="card-image" />
            </div>
            <div className="card-title">
                <h3>{title}</h3>
            </div>
        </div>
    );
}

export default Card;
