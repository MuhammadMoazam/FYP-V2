import React, { useEffect, useState } from "react";
import "./Testimonial.css";

const Testimonial = () => {
  const [animateCards, setAnimateCards] = useState(false);

  useEffect(() => {
    setAnimateCards(true); // Trigger animation when component mounts
  }, []);

  return (
    <div className="testimonial-container">
      <h2 className="testimonial-heading">Our Experience Is Your Advantage</h2>
      <p className="testimonial-subheading">
        Hear what our incredible customers have to say!
      </p>
      <div className={`testimonial-cards ${animateCards ? "animate" : ""}`}>
        <div className="testimonial-card">
          <div className="quote-icon">&#8220;</div>
          <p className="testimonial-text">
            UrbanClothe is my go-to store for trendy outfits! The quality of
            their clothes is amazing, and everything fits perfectly. Plus, their
            customer service is top-notch. Highly recommend!
          </p>
          <p className="testimonial-author">Herman Miller</p>
          <p className="testimonial-role">COO</p>
        </div>

        <div className="testimonial-card">
          <div className="quote-icon">&#8220;</div>
          <p className="testimonial-text">
            I was blown away by how fast my order arrived. The fabric is soft,
            and the designs are exactly like the photos. UrbanClothe has
            definitely earned a loyal customer in me.
          </p>
          <p className="testimonial-author">Isabel Gabalis</p>
          <p className="testimonial-role">CEO</p>
        </div>

        <div className="testimonial-card">
          <div className="quote-icon">&#8220;</div>
          <p className="testimonial-text">
            I love how versatile and stylish the clothing is at UrbanClothe. The
            prices are reasonable, and the customer rewards program is a great
            bonus. Shopping here is always a pleasure!
          </p>
          <p className="testimonial-author">Ashley Jones</p>
          <p className="testimonial-role">CEO</p>
        </div>

        <div className="testimonial-card">
          <div className="quote-icon">&#8220;</div>
          <p className="testimonial-text">
            I purchased a few outfits for a special event, and I got so many
            compliments! The attention to detail and quality really stand out.
            I will be back for more soon!
          </p>
          <p className="testimonial-author">Asad</p>
          <p className="testimonial-role">CEO</p>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
