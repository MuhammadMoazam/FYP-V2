import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import useApi from "../../components/Contexts/API/useApi";
import { ClipLoader } from "react-spinners";

const Login = () => {

  const navigate = useNavigate();

  const { authenticateUser, registerUser } = useApi();

  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    // Confirm password validation for registration
    if (!isLogin && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
    setSubmitError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      let response;
      if (isLogin) {
        response = await authenticateUser(formData.email, formData.password);
        if (response.message === "unauthorized") {
          setSubmitError("Invalid email or password");
          return;
        }
      } else {
        response = await registerUser(formData.email, formData.password);
        if (response.message === "conflict") {
          setSubmitError("Email already exists");
          return;
        }
      }

      if (response) {
        navigate('/verify-otp', { state: { email: response.email } })
      } else {
        setSubmitError("An unexpected error occurred");
      }
    } catch (error) {
      console.error("Authentication error:", error);
      setSubmitError(
        error.response?.data?.message ||
        "An error occurred. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="login-register">
          <div className="buttons-container">
            <div className={`selected-decoration ${isLogin ? "" : "active"}`} />
            <button
              className={`button ${isLogin ? "active" : ""}`}
              onClick={() => {
                setIsLogin(true);
                setErrors({});
                setSubmitError("");
              }}
            >
              Login
            </button>
            <button
              className={`button ${!isLogin ? "active" : ""}`}
              onClick={() => {
                setIsLogin(false);
                setErrors({});
                setSubmitError("");
              }}
            >
              Register
            </button>
          </div>
        </div>

        <h1 style={{ fontSize: "30px", fontWeight: "bold" }}>{isLogin ? "Login" : "Register"}</h1>

        {submitError && (
          <div className="error-message">
            {submitError}
          </div>
        )}

        <div className="form-container">
          <form className="form" onSubmit={handleSubmit}>
            <div className="input-container">
              <label className="heading-1-style">
                Email address <span className="required">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`input-style ${errors.email ? "error" : ""}`}
                disabled={isLoading}
              />
              {errors.email && (
                <span className="error-text">{errors.email}</span>
              )}
            </div>

            <div className="input-container">
              <label className="heading-1-style">
                Password <span className="required">*</span>
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`input-style ${errors.password ? "error" : ""}`}
                disabled={isLoading}
              />
              {errors.password && (
                <span className="error-text">{errors.password}</span>
              )}
            </div>

            {!isLogin && (
              <div className="input-container">
                <label className="heading-1-style">
                  Confirm Password <span className="required">*</span>
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`input-style ${errors.confirmPassword ? "error" : ""}`}
                  disabled={isLoading}
                />
                {errors.confirmPassword && (
                  <span className="error-text">{errors.confirmPassword}</span>
                )}
              </div>
            )}

            {isLogin && (
              <div className="remember-me">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  disabled={isLoading}
                />
                <label htmlFor="rememberMe">Remember me</label>
              </div>
            )}

            <button type='submit' className='submit-button' disabled={isLoading}> {
              isLoading ? (<ClipLoader
                color={'white'}
                loading={isLoading}
                size={30}
                aria-label="Loading Spinner"
                data-testid="loader"
              />)
                : isLogin ? 'Login' : 'Register'} </button>

            {isLogin && (
              <div className="forgot-password">
                <a href="/forgot-password">Forgot your password?</a>
              </div>
            )}
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
