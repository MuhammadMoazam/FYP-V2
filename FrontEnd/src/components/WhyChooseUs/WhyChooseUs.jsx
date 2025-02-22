import React from 'react';
import './WhyChooseUs.css';

const ChooseUs = () => {
    return (
        <div className="choose-us">
            <h2>Why choose us?</h2>
            <div className="content">
                <div className="with-us">
                    <h3>With Us</h3>
                    <ul>
                        <li>💲 Competitive Pricing on Quality Garments.</li>
                        <li>🎨 Trendy and Unique Designs for All Seasons.</li>
                        <li>🤝 Dedicated to Customer Satisfaction.</li>
                    </ul>
                </div>
                <div className="divider"></div>
                <div className="competitors">
                    <h3>Competitors</h3>
                    <ul>
                        <li>💵 Higher Prices Found at Other Stores.</li>
                        <li>📉 Stuck with Outdated and Traditional Designs.</li>
                        <li>💼 More Focus on Profits Than Customers.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ChooseUs;