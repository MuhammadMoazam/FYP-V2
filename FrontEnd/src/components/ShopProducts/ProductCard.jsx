import React from "react";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} className="product-image" />
      <h3 className="product-title">{product.title}</h3>
      <p className="product-price">
        <span className="old-price">{product.oldPrice}</span>
        <span className="new-price">{product.newPrice}</span>
      </p>
    </div>
  );
};

export default ProductCard;
