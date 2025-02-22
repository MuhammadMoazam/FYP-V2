import React, { useState } from "react";
import "./Sidebar.css";

const Sidebar = () => {
  const [priceRange, setPriceRange] = useState(2500);

  const handlePriceChange = (event) => {
    setPriceRange(event.target.value);
  };

  return (
    <div className="sidebar-container">
      <div className="search-section">
        <h3>Search by name</h3>
        <input
          type="text"
          placeholder="Search product..."
          className="search-input"
        />
      </div>

      <div className="category-section">
        <h3>Categories</h3>
        <ul>
          <li>
            <input type="checkbox" id="uncategorized" />
            <label htmlFor="uncategorized">Uncategorized</label>
          </li>
          <li>
            <input type="checkbox" id="formal-wear" />
            <label htmlFor="formal-wear">Formal Wear</label>
          </li>
          <li>
            <input type="checkbox" id="kids" />
            <label htmlFor="kids">Kids</label>
          </li>
          <li>
            <input type="checkbox" id="ladies" />
            <label htmlFor="ladies">Ladies</label>
          </li>
          <li>
            <input type="checkbox" id="outerwear" />
            <label htmlFor="outerwear">Outerwear</label>
          </li>
          <li>
            <input type="checkbox" id="winter-clothes" />
            <label htmlFor="winter-clothes">Winter Clothes</label>
          </li>
          <li>
            <input type="checkbox" id="winter-jersey" />
            <label htmlFor="winter-jersey">Winter Jersey</label>
          </li>
        </ul>
      </div>

      <div className="price-range-section">
        <h3>Price Range</h3>
        <div className="price-range-container">
          <input
            type="range"
            min="1000"
            max="4000"
            value={priceRange}
            step="100"
            onChange={handlePriceChange}
            className="price-range-slider"
          />
          <div className="price-range-labels">
            <span>1000</span>
            <span>{priceRange}</span>
            <span>4000</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
