import Navbar from "../../components/Navbar/Navbar";
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "./Cart.css";
import emptyCartImage from '../../Assets/Images/empty-cart.png';
import Footer from "../../components/Footer/Footer";
import useProducts from "../../components/Contexts/Products/useProducts";
import useCart from "../../components/Contexts/Cart/useCart";
import Loading from "../../components/Loading/Loading";

function Cart()
{

    const navigate = useNavigate()

    const { products } = useProducts()
    const { getCartItems, cartItems, removeCartItem, updateCartItem } = useCart()

    const [localCartItems, setLocalCartItems] = useState([]);
    const [loading, setLoading] = useState(true);

    function setupCart()
    {
        const updatedCartItems = cartItems.map(cartItem =>
        {
            const product = products.find(product => product._id === cartItem.product);
            return product && { ...product, quantity: cartItem.quantity, _id: cartItem._id };
        }).filter(item => item);
        setLocalCartItems(updatedCartItems ?? []);
        setLoading(false);
    }

    async function removeProduct(item)
    {
        setLoading(true);
        await removeCartItem(item);
        setLoading(false);
    }

    async function changeQuantity(item, quantity)
    {
        setLoading(true);
        await updateCartItem(item, quantity);
        setLoading(false);
    }

    async function checkout()
    {
        navigate('/checkout', { state: { orderItems: localCartItems } });
    }

    useEffect(() =>
    {
        setupCart();
    }, [cartItems, products]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() =>
    {
        getCartItems();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div>
            <Navbar />

            <div className="cart-page-container">

                <div className="cart-items-container">
                    <div className="cart-texts-container">
                        <span className="heading-1-style" style={{ fontSize: '25px', color: 'black', fontWeight: 'bold' }}>Ensure Everything's Perfect before You Proceed to Checkout</span>
                        <br />
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span className="heading-1-style" style={{ fontSize: '15px', color: 'black', fontWeight: 'bold' }}>Fast Delivery</span>
                            <span className="heading-1-style" style={{ fontSize: '12px', color: 'grey' }}> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nesciunt non itaque sunt officia fuga in culpa temporibus! Soluta consequuntur incidunt nihil, fugit illum doloribus dignissimos ipsam iusto aspernatur, tenetur sunt? </span>

                            <span className="heading-1-style" style={{ fontSize: '15px', color: 'black', fontWeight: 'bold' }}>30-Days Money Back Guarantee</span>
                            <span className="heading-1-style" style={{ fontSize: '12px', color: 'grey' }}> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis qui delectus assumenda natus exercitationem. Dolorum inventore dolorem libero, quae molestiae labore quas assumenda hic error, fuga mollitia, dolore voluptatum numquam. </span>
                        </div>

                    </div>

                    <div className="cart-items-content">
                        {
                            localCartItems.length === 0 ? <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <span className="heading-1-style" style={{ fontSize: '25px', color: 'black', fontWeight: 'bold' }}>Your cart is empty</span>
                                <img src={emptyCartImage} alt="Empty Cart" style={{ width: '500px' }} />
                            </div> :
                                <div className="table-container">
                                    <table className="product-table">
                                        <thead>
                                            <tr className="table-header">
                                                <th>Product</th>
                                                <th>Price (Rs.)</th>
                                                <th>Quantity</th>
                                                <th>Subtotal (Rs.)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {localCartItems.map((item) => (
                                                <tr key={item._id} className="table-row cart-item-container">
                                                    <td className="table-cell" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                                        <button className="remove-button" onClick={() => removeProduct(item._id)}>✖</button>
                                                        <img src={item.imgSrc} alt={item.name} className="product-image" style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #eee' }} />
                                                        <span style={{ fontWeight: 'bold', fontSize: '1rem' }}>{item.name}</span>
                                                    </td>
                                                    <td className="table-cell">{item.discountedPrice ? item.discountedPrice : item.price}</td>
                                                    <td className="table-cell" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100px' }}>
                                                        <button className="quantity-button" disabled={item.quantity === 1} onClick={() => changeQuantity(item._id, item.quantity - 1)}>-</button>
                                                        {item.quantity}
                                                        <button className="quantity-button" onClick={() => changeQuantity(item._id, item.quantity + 1)}>+</button>
                                                    </td>
                                                    <td className="table-cell">{(item.discountedPrice ? item.discountedPrice : item.price) * item.quantity}</td>
                                                </tr>
                                            ))}
                                        </tbody>

                                        <Loading loading={loading} />
                                    </table>

                                    <div className="coupon-container">
                                        <input type="text" placeholder="Coupon Code" className="coupon-input" />
                                        <button className="coupon-button">Apply Coupon</button>
                                    </div>

                                    <div className="cart-total-container">
                                        <span>Cart Total</span>

                                        <span>
                                            {localCartItems.reduce((total, item) => total + ((item.discountedPrice ? item.discountedPrice : item.price) * item.quantity), 0)}
                                        </span>
                                    </div>

                                    <button className="submit-button" onClick={checkout} style={{ width: '100%', maxWidth: '350px', margin: '24px auto 0', display: 'block', padding: '16px 0', fontSize: '1.2rem', borderRadius: '30px', background: '#222', color: '#fff', fontWeight: 'bold', letterSpacing: '1px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                                        Proceed to Checkout
                                    </button>
                                </div>
                        }

                    </div>

                </div>

            </div>

            <Footer />
        </div >
    );
}

export default Cart;