import React from "react";
import Card from "../Card/Card";
import "./CardsList.css";
import image from '../../Assets/Articles/article1.jpg'

const cardsData = [
    {
        imageUrl: {image}, // Replace with actual image URL
        readingTime: 3,
        title: "Discover UrbanClothe’s Winter...",
    },
    {
        imageUrl: "../../Assets/Articles/article1.jpg",
        readingTime: 3,
        title: "This is a Sample Post with a...",
    },
    {
        imageUrl: "https://via.placeholder.com/300x200",
        readingTime: 3,
        title: "This is a Sample Post",
    },
];

function CardsList()
{
    return (
        <div className="cards-container">
            {cardsData.map((card, index) => (
                <Card
                    key={index}
                    imageUrl={image}
                    readingTime={card.readingTime}
                    title={card.title}
                />
            ))}
        </div>
    );
}

export default CardsList;
