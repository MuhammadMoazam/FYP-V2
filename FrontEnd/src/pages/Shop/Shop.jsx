import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Banner from "../../components/Lower_Banner/Lower_Banner";
import TImage from "../../components/TImage/TImage";
import Sidebar from "../../components/SideBar/Sidebar";
import "./Shop.css";
import { BounceLoader } from "react-spinners";
import useProducts from "components/Contexts/Products/useProducts";
import useCart from "components/Contexts/Cart/useCart";

const Shop = () =>
{
  const { products: allProducts, getProducts } = useProducts();
  const {
    cartItems,
    addCartItem,
    removeCartItem: removeCartItemApi,
    updateCartItem,
  } = useCart();

  const [sortOption, setSortOption] = useState("default");
  const [products, setProducts] = useState(allProducts);
  const [loading, setLoading] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSortChange = (e) =>
  {
    setSortOption(e.target.value);
    const sortedProducts = [...products].sort((a, b) =>
    {
      switch (e.target.value)
      {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });
    setProducts(sortedProducts);
  };

  const handleAddToCart = async (product) =>
  {
    setLoading(product);
    const itemExists = cartItems.some((item) => item.product === product);
    if (itemExists)
    {
      setLoading("");
      return;
    }
    await addCartItem(product);
    setLoading("");
  };

  async function changeQuantity(item, quantity)
  {
    setLoading(item);
    await updateCartItem(item, quantity);
    setLoading("");
  }

  async function removeCartItem(item)
  {
    setLoading(item);
    await removeCartItemApi(item);
    setLoading("");
  }

  useEffect(() =>
  {
    getProducts();
    // eslint-disable-next-line
  }, []);

  useEffect(() =>
  {
    setProducts(allProducts);
  }, [allProducts]);

  useEffect(() =>
  {
    if (!allProducts || allProducts.length === 0) return;
    // Calculate min/max price from products
    const prices = allProducts
      .map((p) => Number(p.discountedPrice || p.price || p.originalPrice))
      .filter(Boolean);
    if (prices.length > 0)
    {
      setPriceRange([Math.min(...prices), Math.max(...prices)]);
    }
  }, [allProducts]);

  const handleCategoryChange = (category) =>
  {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };
  const handlePriceChange = (range) =>
  {
    setPriceRange(range);
  };
  const handleSearchChange = (term) =>
  {
    setSearchTerm(term);
  };

  useEffect(() =>
  {
    let filtered = allProducts;
    if (selectedCategories.length > 0)
    {
      filtered = filtered.filter((p) => selectedCategories.includes(p.category));
    }
    filtered = filtered.filter((p) =>
    {
      const price = Number(p.discountedPrice || p.price || p.originalPrice);
      return price >= priceRange[0] && price <= priceRange[1];
    });
    if (searchTerm)
    {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setProducts(filtered);
  }, [allProducts, selectedCategories, priceRange, searchTerm]);

  return (
    <>
      <Navbar />
      <TImage
        title="Shop"
        description="Browse our trendy collections and shop the latest in fashion styles."
      />
      <div className="breadcrumb">
        <a href="/">Home</a> &gt; <span>Shop</span>
      </div>

      <div className="shop-container">
        <Sidebar
          categories={Array.from(
            new Set(allProducts.map((p) => p.category)).values()
          )}
          selectedCategories={selectedCategories}
          onCategoryChange={handleCategoryChange}
          priceRange={priceRange}
          onPriceChange={handlePriceChange}
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          minPrice={priceRange[0]}
          maxPrice={priceRange[1]}
        />
        <div className="shop-content">
          <div className="shop-header">
            <div className="results-count">
              Showing 1–{products.length} of {products.length} results
            </div>
            <div className="sort-container">
              <label htmlFor="sort">Sort By:</label>
              <select id="sort" value={sortOption} onChange={handleSortChange}>
                <option value="default">Default</option>
                <option value="priceLowHigh">Price: Low to High</option>
                <option value="priceHighLow">Price: High to Low</option>
                <option value="latest">Latest</option>
              </select>
            </div>
          </div>
          <div className="product-grid">
            {products.map((product) => (
              <div
                key={product._id}
                className="product-card"
                //onClick={() => handleProductClick(product._id)} *commented out because it interferes with the cart button....
                role="button"
                tabIndex={0}
              >
                {product.discount && (
                  <span className="discount-badge">{product.discount}</span>
                )}
                <img
                  src={product.imgSrc}
                  alt={product.name}
                  onError={(e) =>
                  {
                    //console.error('Error loading image for product:', product._id);
                    e.target.src = "/placeholder-image.jpg"; // Add a placeholder image
                  }}
                />

                <div className="prod">
                  <h3>{product.name}</h3>

                  <button
                    disabled={loading === product._id}
                    tabIndex={10}
                    onClick={() => handleAddToCart(product._id)}
                    className="cart-button"
                  >
                    {loading === product._id ? (
                      <BounceLoader
                        color={"white"}
                        loading={loading === product._id}
                        size={20}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                      />
                    ) : cartItems.some(
                      (cartItem) => cartItem.product === product._id
                    ) ? (
                      (() =>
                      {
                        const foundItem = cartItems.find(
                          (cartItem) => cartItem.product === product._id
                        );
                        return (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              width: "100px",
                            }}
                          >
                            <button
                              className="quantity-change-button"
                              style={{
                                color:
                                  foundItem.quantity === 1 ? "#d9534f" : "white",
                                border:
                                  foundItem.quantity === 1
                                    ? "1px solid #d9534f"
                                    : "1px solid white",
                              }}
                              onClick={() =>
                              {
                                if (foundItem.quantity === 1)
                                {
                                  removeCartItem(foundItem._id);
                                } else
                                {
                                  changeQuantity(foundItem._id, foundItem.quantity - 1);
                                }
                              }}
                            >
                              {" "}
                              {foundItem.quantity === 1 ? "✖" : "-"}
                            </button>
                            {foundItem.quantity}
                            <button
                              className="quantity-change-button"
                              onClick={() =>
                                changeQuantity(foundItem._id, foundItem.quantity + 1)
                              }
                            >
                              +
                            </button>
                          </div>
                        );
                      })()
                    ) : (
                      "Add to Cart"
                    )}
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
              </div>
            ))}
          </div>
        </div>
      </div>

      <Banner />
      <Footer />
    </>
  );
};

export default Shop;
