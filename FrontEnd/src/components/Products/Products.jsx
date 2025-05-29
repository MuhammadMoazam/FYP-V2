import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Products.css";
import useProducts from "components/Contexts/Products/useProducts";
import useCart from "components/Contexts/Cart/useCart";

const Products = () =>
{
  const { products, getProducts } = useProducts();
  const { cartItems, addCartItem } = useCart();
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() =>
  {
    getProducts(); // Fetch all products for homepage
    // eslint-disable-next-line
  }, []);

  if (!products || products.length === 0)
  {
    return null; // Don't render anything if no products
  }

  const productsToShow = products.slice(currentIndex, currentIndex + 5);

  const nextProduct = () =>
  {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % (products.length - 4));
  };

  const prevProduct = () =>
  {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? products.length - 5 : prevIndex - 1
    );
  };

  const handleAddToCart = async (productId) =>
  {
    await addCartItem(productId);
    navigate("/cart");
  };

  return (
    <div className="products-container">
      <h2 className="titlee">Our Premium Products</h2>
      <div className="slider">
        <button className="slider-button left" onClick={prevProduct}>
          &lt;
        </button>
        <div className="products-grid">
          {productsToShow.map((product) => (
            <div key={product._id} className="product-card">
              <Link to={`/products/${product._id}`}>
                {product.discount && (
                  <span className="discount-badge">{product.discount}</span>
                )}
                <img
                  src={product.imgSrc}
                  alt={product.name}
                  onError={(e) =>
                  {
                    e.target.src = "/placeholder-image.jpg"; // Handle image errors
                  }}
                />
                <div className="prod1">
                  <h3 className="product-name">{product.name}</h3>

                  <button
                    className="cart-button"
                    onClick={() => handleAddToCart(product._id)}
                    disabled={cartItems.some((item) => item.product === product._id)}
                  >
                    {cartItems.some((item) => item.product === product._id) ? "In Cart" : "Add to Cart"}
                  </button>

                  <p>
                    {product.originalPrice && (
                      <span className="old-price">
                        <span className="price-label">Original Price: </span>$
                        {product.originalPrice}
                      </span>
                    )}
                    <span className="new-price">
                      <span className="price-label">Discounted Price: </span>$
                      {product.discountedPrice || product.price}
                    </span>
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <button className="slider-button right" onClick={nextProduct}>
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Products;
