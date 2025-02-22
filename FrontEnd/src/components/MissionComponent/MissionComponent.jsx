import React from "react";
import "./MissionComponent.css";
import image from "Assets/steptodown.com411784.jpg";

const MissionComponent = () => {
  return (
    <div className="mission-container">
      <div className="mission-text">
        <h1>
          Our Mission, To Inspire <br /> Confidence Through Fashion.
        </h1>
        <p>
          At the core of our brand is a dedication to helping you look and feel
          your best. We offer a carefully curated selection of clothing that
          blends style, quality, and affordability. Every garment is chosen with
          care to ensure you receive the perfect fit and unmatched comfort. Your
          satisfaction is our priority, and our team is here to provide you with
          a seamless, enjoyable shopping experience.
        </p>
        <div className="mission-icons">
          <div className="icon">
            <i className="fas fa-users"></i>
            <span>Customer Focused</span>
          </div>
          <div className="icon">
            <i className="fas fa-shipping-fast"></i>
            <span>Fast Delivery</span>
          </div>
        </div>
        <button className="shop-now-btn">Shop Now →</button>
      </div>
      <div className="mission-image">
        <img
          src={image} // Replace with your actual image path
          alt="Fashion Inspiration"
        />
        <div className="testimonial">
          <p>
            <strong>Samm Smeltzer</strong>
            Fashion is the armor to survive the reality of everyday life.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MissionComponent;
