import React, { useState, useEffect } from "react";
import "./Sidebar.css";

const Sidebar = ({
  categories = [],
  selectedCategories = [],
  onCategoryChange = () => { },
  priceRange = [0, 10000],
  onPriceChange = () => { },
  searchTerm = "",
  onSearchChange = () => { },
  minPrice = 0,
  maxPrice = 10000,
}) =>
{
  const [localPrice, setLocalPrice] = useState(priceRange[1]);

  useEffect(() =>
  {
    setLocalPrice(priceRange[1]);
  }, [priceRange]);

  return (
    <div className="sidebar-container">
      <div className="search-section">
        <h3>Search by name</h3>
        <input
          type="text"
          placeholder="Search product..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="category-section">
        <h3>Categories</h3>
        <ul>
          {categories.map((cat) => (
            <li key={cat}>
              <input
                type="checkbox"
                id={cat}
                checked={selectedCategories.includes(cat)}
                onChange={() => onCategoryChange(cat)}
              />
              <label htmlFor={cat}>{cat}</label>
            </li>
          ))}
        </ul>
      </div>

      <div className="price-range-section">
        <h3>Price Range</h3>
        <div className="price-range-container">
          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            value={localPrice}
            step={Math.max(1, Math.floor((maxPrice - minPrice) / 20))}
            onChange={(e) =>
            {
              setLocalPrice(Number(e.target.value));
              onPriceChange([minPrice, Number(e.target.value)]);
            }}
            className="price-range-slider"
            style={{ width: "100%" }}
          />
          <div className="price-range-labels">
            <span>{minPrice}</span>
            <span>{localPrice}</span>
            <span>{maxPrice}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
