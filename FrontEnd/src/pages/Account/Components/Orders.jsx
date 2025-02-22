import React, { useState, useEffect } from 'react';
import useApi from '../../../components/Contexts/API/useApi';
import './Components.css';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { getOrders, cancelOrder } = useApi();

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await getOrders();
            if (response.success) {
                setOrders(response.data);
            } else {
                setError('Failed to fetch orders');
            }
        } catch (err) {
            setError('An error occurred while fetching orders');
        } finally {
            setLoading(false);
        }
    };

    const handleCancelOrder = async (orderId) => {
        try {
            const response = await cancelOrder(orderId);
            if (response.success) {
                // Update the order status in the local state
                setOrders(orders.map(order => 
                    order._id === orderId 
                        ? { ...order, orderStatus: 'cancelled' }
                        : order
                ));
            } else {
                setError(response.message || 'Failed to cancel order');
            }
        } catch (err) {
            setError('An error occurred while cancelling the order');
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'processing':
                return '#f0ad4e';
            case 'shipped':
                return '#5bc0de';
            case 'delivered':
                return '#5cb85c';
            case 'cancelled':
                return '#d9534f';
            default:
                return '#777';
        }
    };

    if (loading) {
        return (
            <div className="orders">
                <h2>Orders</h2>
                <div className="loading-spinner">Loading orders...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="orders">
                <h2>Orders</h2>
                <div className="error-message">{error}</div>
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="orders">
                <h2>Orders</h2>
                <div className="no-orders-message">
                    You haven't placed any orders yet.
                </div>
            </div>
        );
    }

    return (
        <div className="orders">
            <h2>Orders</h2>
            <div className="orders-list">
                {orders.map(order => (
                    <div key={order._id} className="order-card">
                        <div className="order-header">
                            <div>
                                <h3>Order #{order.orderNumber}</h3>
                                <p className="order-date">
                                    {new Date(order.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                            <div className="order-status" style={{ color: getStatusColor(order.orderStatus) }}>
                                {order.orderStatus.toUpperCase()}
                            </div>
                        </div>
                        
                        <div className="order-items">
                            {order.orderItems.map((item, index) => (
                                <div key={index} className="order-item">
                                    <img 
                                        src={item.product.images[0]} 
                                        alt={item.product.name}
                                        className="order-item-image"
                                    />
                                    <div className="order-item-details">
                                        <h4>{item.product.name}</h4>
                                        <p>Quantity: {item.quantity}</p>
                                        <p>Price: ${item.price.toFixed(2)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="order-footer">
                            <div className="order-total">
                                <strong>Total:</strong> ${order.totalAmount.toFixed(2)}
                            </div>
                            {order.orderStatus === 'processing' && (
                                <button 
                                    className="cancel-order-button"
                                    onClick={() => handleCancelOrder(order._id)}
                                >
                                    Cancel Order
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Orders;
