import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css"
const handleScrollToTop = () =>
{
    window.scrollTo({
        top: 0, // Scroll to the top of the page
        behavior: "smooth", // Smooth scroll animation
    });
}
const Footer = () =>
{
    return (
        <footer className="footer">
            <div className="footer-container">
                {/* Logo and Social Icons */}
                <div className="footer-section">
                    <div className="logo">
                        <h2>URBAN CLOTHE</h2>
                    </div>
                    <div className="social-icons">
                        <a href="https://www.facebook.com">
                            <i className="fab fa-facebook"></i>
                        </a>
                        <a href="https://www.twitter.com">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href="https://www.instagram.com">
                            <i className="fab fa-instagram"></i>
                        </a>
                    </div>
                </div>

                {/* Quick Links */}
                <div className="footer-section">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><Link to="/" onClick={handleScrollToTop}>Home</Link></li>
                        <li><Link to="/about" onClick={handleScrollToTop}>About Us</Link></li>
                        <li><Link to="/shop" onClick={handleScrollToTop}>Shop</Link></li>
                        <li><Link to="/contact" onClick={handleScrollToTop}>Contact</Link></li>
                        <li><Link to="/blog" onClick={handleScrollToTop} >Blog</Link></li>
                    </ul>
                </div>

                
                <div className="footer-section">
                    <h3>Important Links</h3>
                    <ul>
                        <li><Link to="/terms" onClick={handleScrollToTop}>Terms and Conditions</Link></li>
                        <li><Link to="/legal" onClick={handleScrollToTop}>Legal</Link></li>
                    </ul>
                </div>

                {/* Payment Method Icons */}
                <div className="footer-section">
                    <h3>We Accept</h3>
                    <div className="payment-icons">
                        <i className="fab fa-cc-mastercard"></i>
                        <i className="fab fa-cc-visa"></i>
                        <i className="fab fa-cc-paypal"></i>
                        <i className="fab fa-cc-stripe"></i>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="footer-top"></div>
            <div className="footer-bottom">
                <p>Copyright &copy; 2024 Urban Clothe</p>
            </div>
        </footer>
    );
};
export default Footer;



