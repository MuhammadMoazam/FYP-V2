import React from "react";
import "./HowToAvailOffers.css";

const HowToAvailOffers = () => {
  return (
    <div className="offers-container">
      <h2 className="offers-title">How to Avail Offers</h2>
      <div className="timeline">
        
          <Stepper stepNo={1} stepText={<p>Drop by our physical store at Urban Clothe to browse our latest  collections and get personalized style advice.</p>} />
          <Stepper stepNo={2} stepText={<p>Reach out by phone at +92 313 7265181 for quick assistance, orderinquiries, or help with sizing.</p>}/>
          <Stepper stepNo={3} stepText={
            <p>Have a question or need support? 
                <a className="link-inside-text" href="mailto:urbanclothe@gmail.com" target="_blank" rel="noopener noreferrer"> Email Us</a>
              ,and we'll get back to you as soon as possible.
            </p>}/>
        
        
      </div>
      <div className="contact-button">
        <button>Get In Touch →</button>
      </div>
    </div>
  );
};

const Stepper = ({stepNo, stepText}) => {
  return (
    <div className="timeline-item">
      <div className="timeline-icon active-icon">
        <span>🚀</span>
      </div>
      <div className="timeline-content">
        <h3>Step {stepNo}</h3>
        {stepText}
      </div>
    </div>
  );
};
export default HowToAvailOffers;
