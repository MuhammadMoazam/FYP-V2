import React from 'react'
import './AboutTwo.css'
const AboutTwo = () =>
{
    return (
        <>
            <section className="promise-section">
                <div className="promise-image"></div> {/* No need for <img> tag here */}
                <div className="promise-content">
                    <h2>Our Promise to You</h2>
                    <p>
                        At Urban Clothe, we are committed to delivering not only high-quality
                        products but also an exceptional customer experience. Our promise is
                        simple: to offer you the best in quality, value, and service, every
                        time you shop with us. We’re here to make your experience smooth,
                        enjoyable, and memorable.
                    </p>
                    <button className="cta2-button">Get Your Place <span>→</span></button>
                </div>
            </section>
        </>
    )
}

export default AboutTwo
