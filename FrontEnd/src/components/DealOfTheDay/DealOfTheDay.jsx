

import image3 from 'Assets/dealoftheday.png';
import React from "react";
import "./DealOfTheDay.css";

function App() {
  return (
    <div className="deal-container">
      <div className="deal-wrapper">
        {/* Left Side: Image Section */}
        <div className="image-section">
          <img src={image3} alt="Deal of the Day" className="deal-image" />
        </div>
        {/* Right Side: Deal Content Section */}
        <div className="content-section">
          <h2 className="deal-title">Deal Of The Day</h2>
          <p className="deal-description">
            Final Sale Items Up to 70% off sale! Ends In
          </p>
          <div className="countdown-timer">
            <div>
              <span className="timer-value">01</span>
              <span className="timer-label">HRS</span>
            </div>
            <div>
              <span className="timer-value">32</span>
              <span className="timer-label">MIN</span>
            </div>
            <div>
              <span className="timer-value">36</span>
              <span className="timer-label">SECS</span>
            </div>
          </div>
          <button className="deal-button">Take The Deal →</button>
        </div>
      </div>
    </div>
  );
}

export default App;
