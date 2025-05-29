import Navbar from "../../components/Navbar/Navbar";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import "./Checkout.css";
import Footer from "../../components/Footer/Footer";
import useUser from "../../components/Contexts/User/useUser";
import { Input } from "components/Input/Input";

function Checkout()
{

    const navigate = useNavigate()
    const location = useLocation()

    const { user } = useUser()

    const { orderItems } = location?.state || {}

    const [paymentMethod, setPaymentMethod] = useState('bank')
    const [nameInputs, setNameInputs] = useState({ firstName: user?.name.firstName || '', lastName: user?.name.lastName || '' })
    const [otherDetails, setOtherDetails] = useState({ country: '', state: '', city: '', street: '', postcode: '', phone: '', email: user?.email || '' })

    useEffect(() =>
    {
        if (!orderItems)
        {
            navigate('/cart')
        }
    }, [orderItems]);

    const handlePlaceOrder = () =>
    {
        // Check if all required fields are filled
        const allFieldsFilled = nameInputs.firstName.trim() !== '' &&
            nameInputs.lastName.trim() !== '' &&
            otherDetails.country.trim() !== '' &&
            otherDetails.state.trim() !== '' &&
            otherDetails.city.trim() !== '' &&
            otherDetails.street.trim() !== '' &&
            otherDetails.postcode.trim() !== '' &&
            otherDetails.phone.trim() !== '' &&
            otherDetails.email.trim() !== '';

        if (!allFieldsFilled)
        {
            alert('Please fill in all required fields');
            return;
        }

        // Show success message and navigate to home
        alert('Order placed successfully!');
        navigate('/');
    }

    return (
        <div>
            <Navbar />

            <div className="checkout-container">

                <div style={{ fontSize: '18px', fontFamily: 'monospace', color: 'gray', alignSelf: 'center', textAlign: 'center', width: '50%' }}>
                    Have a Coupon? <label style={{ color: '#3b4fe4', cursor: 'pointer' }} onClick={() => { navigate('/cart') }}> Apply the coupon code in the cart!! </label>
                </div>

                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'start', width: '100%', marginTop: '5rem', marginBottom: '5rem' }}>
                    <div className="checkout-details-container">
                        <span className="heading-1-style" style={{ fontSize: '25px', color: 'black', fontWeight: 'bold' }}>Billing Details</span>
                        <br />
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <div className='name-inputs-container'>
                                {Input('First Name', 'text', nameInputs.firstName, (e) => { setNameInputs({ ...nameInputs, firstName: e }) })}
                                <div style={{ width: '100px' }}></div>
                                {Input('Last Name', 'text', nameInputs.lastName, (e) => { setNameInputs({ ...nameInputs, lastName: e }) })}
                            </div>

                            {Input('Country', 'text', otherDetails.country, (e) => { setOtherDetails({ ...otherDetails, country: e }) })}
                            {Input('State', 'text', otherDetails.state, (e) => { setOtherDetails({ ...otherDetails, state: e }) })}
                            {Input('City/Town', 'text', otherDetails.city, (e) => { setOtherDetails({ ...otherDetails, city: e }) })}
                            {Input('Street Address', 'text', otherDetails.street, (e) => { setOtherDetails({ ...otherDetails, street: e }) })}
                            {Input('Postcode/ZIP', 'text', otherDetails.postcode, (e) => { setOtherDetails({ ...otherDetails, postcode: e }) })}
                            {Input('Phone Number', 'text', otherDetails.phone, (e) => { setOtherDetails({ ...otherDetails, phone: e }) })}
                            {Input('Email Address', 'email', otherDetails.email, (e) => { setOtherDetails({ ...otherDetails, email: e }) })}

                            <div className='additional-info-container'>
                                <label style={{ fontWeight: 'bold', color: 'black', fontSize: '20px' }}> Additional Information </label>
                                <label style={{ fontWeight: 'bold', color: 'gray', fontSize: '15px' }}> Order Notes (optional) </label>
                                <textarea style={{ width: '100%', height: '200px', borderRadius: '10px', maxHeight: '200px', marginTop: '5px', padding: '10px' }} placeholder="Notes about your order, e.g. special notes for delivery." />
                            </div>

                        </div>

                    </div>

                    <div className="order-items-content">
                        <div className="table-container">
                            <table className="product-table">
                                <thead>
                                    <tr className="table-header">
                                        <th>Product</th>
                                        <th>Subtotal (Rs.)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orderItems.map((item) => (<tr key={item._id} className="table-row cart-item-container">
                                        <td className="table-cell">{item.name} x {item.quantity}</td>
                                        <td className="table-cell">Rs. {((item.discountedPrice || item.price) * item.quantity).toFixed(2)}</td>
                                    </tr>
                                    ))}
                                </tbody>
                            </table>                            <div className="order-summary">
                                <div className="summary-row subtotal">
                                    <span>Subtotal</span>
                                    <span>Rs. {orderItems.reduce((total, item) => total + (item.discountedPrice || item.price) * item.quantity, 0).toFixed(2)}</span>
                                </div>
                                <div className="summary-row shipping">
                                    <span>Shipping</span>
                                    <span>Rs. 150.00</span>
                                </div>
                                <div className="summary-row">
                                    <span>Tax (5%)</span>
                                    <span>Rs. {(orderItems.reduce((total, item) => total + (item.discountedPrice || item.price) * item.quantity, 0) * 0.05).toFixed(2)}</span>
                                </div>
                                <div className="summary-row total">
                                    <span>Total</span>
                                    <span>Rs. {(
                                        orderItems.reduce((total, item) => total + (item.discountedPrice || item.price) * item.quantity, 0) * 1.05 + 150
                                    ).toFixed(2)}</span>
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <div>
                                    <input style={{ marginTop: '20px', marginRight: '10px' }} type="radio" name="bank" id="bank" checked={paymentMethod === 'bank'} onChange={() => setPaymentMethod('bank')} />
                                    <label style={{ fontFamily: 'monospace', color: 'gray' }}> Bank Transfer </label>
                                    {
                                        paymentMethod === 'bank' && (
                                            <div style={{ marginTop: '10px', borderRadius: '10px', padding: '10px', backgroundColor: '#f5f5f5', fontFamily: 'monospace', fontSize: '12px' }}>
                                                Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.
                                            </div>
                                        )
                                    }
                                </div>

                                <div>
                                    <input style={{ marginTop: '20px', marginRight: '10px' }} type="radio" name="cod" id="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} />
                                    <label style={{ fontFamily: 'monospace', color: 'gray' }}> Cash on Delivery </label>
                                    {
                                        paymentMethod === 'cod' && (
                                            <div style={{ marginTop: '10px', borderRadius: '10px', padding: '10px', backgroundColor: '#f5f5f5', fontFamily: 'monospace', fontSize: '12px' }}>
                                                Pay with cash upon delivery.
                                            </div>
                                        )
                                    }
                                </div>

                                <div style={{ width: '100%', maxWidth: '500px', margin: '20px 0px' }}>
                                    <label className='heading-2-style' >
                                        Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our <a rel="stylesheet" href="/privacy-policy" style={{ color: '#3b4fe4', textDecoration: 'none' }}>privacy policy</a>.
                                    </label>
                                </div>
                            </div>

                            <button
                                className="submit-button"
                                onClick={handlePlaceOrder}
                            >
                                Place Order
                            </button>
                        </div>
                    </div>

                </div>

            </div>

            <Footer />
        </div >
    );
}

export default Checkout;