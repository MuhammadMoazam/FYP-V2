import React from "react";
import ApiProvider from "./components/Contexts/API/APIContext";
import CartProvider from "./components/Contexts/Cart/CartContext";
import ProductsProvider from "./components/Contexts/Products/ProductsContext";
import UserProvider from "./components/Contexts/User/UserContext";
import useApi from "./components/Contexts/API/useApi.js";
import useUser from "./components/Contexts/User/useUser";

import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./pages/About/About";
import Shop from "./pages/Shop/Shop";
import Contact from "./pages/Contact/Contact";
import Blog from "./pages/Blog/Blog";
import Home from "./pages/Home/Home";
import Term from "./pages/Terms/Terms";
import Cart from "./pages/Cart/Cart";
import Legal from "./pages/Legal/Legal";
import Account from "./pages/Account/Account";
import Wishlist from "./pages/Wishlist/Wishlist";
import Checkout from "./pages/Checkout/Checkout";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import Login from "./pages/Login/Login";
import VerifyOTP from "pages/VerifyOTP/VerifyOTP";

// Routes component
const AppRoutes = () => {

  const { loggedIn } = useUser()
  const { checkForAuthentication } = useApi()

  React.useEffect(() => {
    checkForAuthentication();
  }, []);

  return (
    <Routes>
      <Route exact path="/account" name="Account" element={loggedIn ? <Account /> : <Login />} />
      <Route exact path="/verify-otp" name="OTP Verification" element={<VerifyOTP />} />
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/terms" element={<Term />} />
      <Route path="/legal" element={<Legal />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/products/:id" element={<ProductDetail />} />
    </Routes>
  );
};

// Root App component
const App = () => {
  return (
    <Router>
      <UserProvider>
        <ApiProvider>
          <ProductsProvider>
            <CartProvider>
              <AppRoutes />
            </CartProvider>
          </ProductsProvider>
        </ApiProvider>
      </UserProvider>
    </Router>
  );
};

export default App;
