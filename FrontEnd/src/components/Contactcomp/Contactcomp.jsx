import React from 'react'
import './Contactcomp.css'
const Contactcomp = () =>
{
    return (
        <>
            <div className="contact-section">
                <h2>Get in Touch</h2>
                <p className="description">
                    Get in touch with us for any questions, feedback, or support. We're here to assist you and <br />ensure you have the best experience.
                </p>

                <div className="contact-icons">
                    <a href="#!">
                        <i className="fab fa-facebook"></i>
                    </a>
                    <a href="#!">
                        <i className="fas fa-times"></i>
                    </a>
                    <a href="#!">
                        <i className="fab fa-instagram"></i>
                    </a>
                </div>

                <div className="contact-cards">
                    {/* Location */}
                    <div className="card">
                        <div className="icon">
                            <i className="fas fa-map-marker-alt"></i>
                        </div>
                        <h3>Our Location</h3>
                        <p>Lahore, Pakistan</p>
                    </div>

                    {/* Phone */}
                    <div className="card">
                        <div className="icon">
                            <i className="fas fa-phone-alt"></i>
                        </div>
                        <h3>Call Us On</h3>
                        <p>+92 3004566889</p>
                    </div>

                    {/* Email */}
                    <div className="card">
                        <div className="icon">
                            <i className="fas fa-envelope"></i>
                        </div>
                        <h3>Email us</h3>
                        <p>info@urbanclothe.com</p>
                    </div>
                </div>
            </div>

            {/*  */}
            {/*  */}
            <section className="google-map-section">
                <h2 className="google-map-heading">Find Us Here</h2>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27197.316275082332!2d74.31475793994211!3d31.560819909601392!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39191b3297a3b9c5%3A0xca38a239b2a502a9!2sGarhi%20Shahu%2C%20Lahore%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1734251980318!5m2!1sen!2s"
                    width="100%"
                    height="500"
                    className="google-map-iframe"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title='Google map'
                ></iframe>
            </section>

        
        </>

    )
}

export default Contactcomp
