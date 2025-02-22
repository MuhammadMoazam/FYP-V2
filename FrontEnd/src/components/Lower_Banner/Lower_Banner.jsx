import React from 'react'
import './Lower_Banner.css'
const Banner = () =>
{
    return (
        <>
            <div className="subscription-container">
                <p className="subscription-text">
                    <strong>Yes! Send me exclusive offers, unique gift ideas for your shopping.</strong>
                </p>
                <form className="subscription-form">
                    <input
                        type="email"
                        placeholder="e.g. elon.musk@tesla.com"
                        className="email-input"
                        required
                    />
                    <button type="submit" className="subscribe-button">
                        Subscribe
                    </button>
                </form>
            </div>
        </>
    )
}

export default Banner
