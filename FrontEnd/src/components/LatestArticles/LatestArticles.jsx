// LatestArticles.jsx

import React from "react";
import "./LatestArticles.css";
import image1 from 'Assets/Articles/article1.jpg'
import image3 from 'Assets/Articles/article3.jpg'
import image2 from 'Assets/Articles/article2.jpg'
import { Link } from "react-router-dom";

const articles = [
  {
    image: image1,
    title: "Discover UrbanClothe’s Winter...",
    readTime: "5 minutes of reading",
  },
  {
    image: image2,
    title: "This is a Sample Post with a...",
    readTime: "3 minutes of reading",
  },
  {
    image: image3,
    title: "This is a Sample Post",
    readTime: "3 minutes of reading",
  },
];

const LatestArticles = () => {
  return (
    <div className="latest-articles">
      <div className="header">
        <h2>Our Latest articles and news</h2>
        <Link to="/all-articles" className="read-all">Read All Articles →</Link>
      </div>
      <div className="articles-container">
        {articles.map((article, index) => (
          <div key={index} className="article-card">
            <img src={article.image} alt={article.title} className="article-image" />
            {article.readTime && <span className="read-time">{article.readTime}</span>}
            <div className="article-title">{article.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestArticles;
