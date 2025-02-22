import React from 'react'
import { FaApple, FaAmazon, FaGoogle, FaMicrosoft } from "react-icons/fa"; // Importing company logos
import './AboutThree.css'
const AboutThree = () =>
{
    return (
        <>
            <section className="testimonial-section">
                <div className="content-container">
                    <h2 className="testimonial-heading">People Who Love Our Place</h2>
                    <p className="testimonial-description">
                        Thousands of satisfied customers love shopping at Urban Clothe for our
                        premium <span className="bold-text">Dressing</span>, top-notch customer service, and easy
                        online shopping experience. Discover why we're the go-to choice for{" "}
                        <span className="bold-text">Kids and Ladies</span> today!
                    </p>

                    <div className="logo-grid">
                        <div className="logo-card">
                            <FaApple className="company-logo apple" title="Apple" />
                        </div>
                        <div className="logo-card">
                            <FaAmazon className="company-logo amazon" title="Amazon" />
                        </div>
                        <div className="logo-card">
                            <FaGoogle className="company-logo google" title="Google" />
                        </div>
                        <div className="logo-card">
                            <FaMicrosoft className="company-logo microsoft" title="Microsoft" />
                        </div>
                    </div>
                </div>
            </section>
        </>

    )
}

export default AboutThree
