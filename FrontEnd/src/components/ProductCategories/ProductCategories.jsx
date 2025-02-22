import image1 from "Assets/Product Categories/winter-collection.png";
import image2 from "Assets/Product Categories/Sales.png";
import image3 from "Assets/Product Categories/Women-Winter.jpg";
import image4 from "Assets/Product Categories/Womens-Collection.png";
import image5 from "Assets/Product Categories/kids-collection.png";
import React from "react";
import "./ProductCategories.css";

const ProductCategories = () => {
  const categories = [
    {
      title: "Winter Specials",
      subtitle: '',
      image: image1, // Replace with actual image path
      height: '400px', // Adjusted height
    },
    {
      title: "Women Collection",
      subtitle: "",
      image: image4, // Replace with actual image path
    },
    {
      title: "Kids Collection",
      subtitle: "",
      image: image5, // Replace with actual image path
    },
    {
      title: "Women Winter",
      subtitle: '',
      image: image3, // Replace with actual image path
    },
    {
      title: "Sales %",
      subtitle: '',
      image: image2, // Replace with actual image path
    },
  ];

  return (
    <div className="product-categories-container">
      <h2>Our Product Categories</h2>
      <div className="categories-grid">
        <div className="left-category">
          {/* Winter Specials Card */}
          <div className="category-card">
            <div className="winter-special-bar">Winter Specials</div>
            <img
              src={categories[0].image}
              alt={categories[0].title}
              className="category-image"
              style={{ height: categories[0].height }}
            />
          </div>
        </div>
        <div className="right-categories">
          <div className="top-row">
            <div className="category-card">
              <img src={categories[1].image} alt={categories[1].title} className="category-image" />
              <div className="category-info">
                <h3>{categories[1].title}</h3>
                {categories[1].subtitle && <p>{categories[1].subtitle}</p>}
              </div>
            </div>
            <div className="category-card">
              <img src={categories[2].image} alt={categories[2].title} className="category-image" />
              <div className="category-info">
                <h3>{categories[2].title}</h3>
                {categories[2].subtitle && <p>{categories[2].subtitle}</p>}
              </div>
            </div>
          </div>
          <div className="bottom-row">
            <div className="category-card">
              <img src={categories[3].image} alt={categories[3].title} className="category-image" />
              <div className="category-info">
                <h3>{categories[3].title}</h3>
                {categories[3].subtitle && <p>{categories[3].subtitle}</p>}
              </div>
            </div>
            <div className="category-card">
              <img src={categories[4].image} alt={categories[4].title} className="category-image" />
              <div className="category-info">
                <h3>{categories[4].title}</h3>
                {categories[4].subtitle && <p>{categories[4].subtitle}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCategories;
