import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import useCart from "../Contexts/Cart/useCart";
import "./ProductDetail.css";
import useProducts from "components/Contexts/Products/useProducts";
import Loading from "components/Loading/Loading";

const ProductDetail = () => {
  const navigate = useNavigate();

  const { products } = useProducts();
  const { cart, addCartItem, updateCartItem } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    const id = params.get("id");
    const product = products.find((p) => p._id === id);
    if (!product)
      navigate("/shop"); // Navigate back to shop if product not found

    setProduct(product);
    if (product) {
      if (!cart) return;
      const cartItem = cart?.products?.find((item) => item._id === product._id);
      if (cartItem) {
        setQuantity(cartItem.quantity);
      }
    }

    setLoading(false);
  }, []);

  const handleQuantityChange = async (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 1 && value <= (product?.stock || 1)) {
      await updateCartItem(product._id, value);
      setQuantity(value);
    }
  };

  const handleIncrement = async () => {
    if (product && quantity < product.stock) {
      await handleQuantityChange({
        target: { value: quantity + 1 },
      });
    }
  };

  const handleDecrement = async () => {
    if (quantity > 1) {
      await handleQuantityChange({
        target: { value: quantity - 1 },
      });
    }
  };

  const handleAddToCart = async () => {
    if (!product || product.stock === 0) {
      setError("Product is out of stock");
      return;
    }

    try {
      setAddingToCart(true);
      const result = await addCartItem(product, product.price);

      if (result.success) {
        // Navigate to cart or show a success message
        navigate("/cart");
      } else {
        setError(result.message || "Failed to add item to cart");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <Loading true />
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="error">{error}</div>
        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="error">Product not found</div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="product-detail-container">
        <div className="product-breadcrumb">
          <a href="/">Home</a> &gt; <a href="/shop">Shop</a> &gt;{" "}
          <span>{product.name}</span>
        </div>

        <div className="product-detail-content">
          <div className="product-details-img">
            <img src={product.imgSrc} alt={product.name} />
          </div>

          <div className="product-info">
            <h1>{product.name}</h1>
            <div className="product-price">
              {product.originalPrice && (
                <span className="old-price">${product.originalPrice}</span>
              )}
              <span className="new-price">
                ${product.discountedPrice || product.price}
              </span>
            </div>

            <p className="product-description">{product.description}</p>

            <div className="product-meta">
              <p className="category">Category: {product.category}</p>
              <p className="stock">
                Status:{" "}
                <span
                  className={product.stock > 0 ? "in-stock" : "out-of-stock"}
                >
                  {product.stock > 0
                    ? `In Stock (${product.stock} available)`
                    : "Out of Stock"}
                </span>
              </p>
            </div>

            <div className="quantity-selector">
              <button
                onClick={handleDecrement}
                disabled={quantity <= 1}
                className="quantity-btn"
              >
                -
              </button>
              <input
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                min="1"
                max={product.stock}
                className="quantity-input"
              />
              <button
                onClick={handleIncrement}
                disabled={quantity >= product.stock}
                className="quantity-btn"
              >
                +
              </button>
            </div>

            <button
              className="add-to-cart-btn"
              onClick={handleAddToCart}
              disabled={product.stock === 0 || addingToCart}
            >
              {addingToCart
                ? "Adding to Cart..."
                : product.stock === 0
                  ? "Out of Stock"
                  : "Add to Cart"}
            </button>
            {error && <p className="error-message">{error}</p>}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetail;
