import React from 'react';
import './TImage.css';
const TImage = ({ title, description}) =>
{
    return (
        <div className="image-container1">
            <div className="image-overlay1">
                <h1 className="heading-top1">{title}</h1>
                <p className="description-top1">{description}</p>
            </div>
        </div>
    );
};

export default TImage;
