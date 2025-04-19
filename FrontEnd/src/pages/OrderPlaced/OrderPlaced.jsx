/* eslint-disable no-unused-vars */
import Navbar from "../../components/Navbar/Navbar";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, replace } from 'react-router-dom';
import "./OrderPlaced.css";
import Footer from "../../components/Footer/Footer";
import useUser from "../../components/Contexts/User/useUser";
import { Input } from "components/Input/Input";
import useApi from "components/Contexts/API/useApi";

function OrderPlaced() {

    const navigate = useNavigate()
    const location = useLocation()

    const { user } = useUser()
    const { cancelOrder, getPaymentIntent } = useApi()

    const [paymentIntentId, setPaymentIntentId] = useState("");
    const [paymentStatus, setPaymentStatus] = useState("Processing...");
    const order = location?.state?.order ?? null;

    useEffect(() => {
        // get id from url 
        const urlParams = new URLSearchParams(window.location.search);
        const paymentIntentId = urlParams.get('payment_intent');
        if (!paymentIntentId) return;

        let status;
        // Fetch the payment status from Stripe
        async function fetchPaymentIntent() {
            const response = await getPaymentIntent(paymentIntentId);

            if (!response) return;

            status = response.status;

            setPaymentStatus(status);

            if (status === "succeeded") {
                console.log("Payment successful! ✅");
            } else if (status === "processing") {
                console.log("Payment is still processing... ⏳");
            } else {
                console.log("Payment failed ❌");
            }
        }

        fetchPaymentIntent();
    }, [getPaymentIntent, paymentIntentId]);

    return (
        <div>
            <Navbar />

            <div className="main-container">

                <div className="payment-status">

                    <h1>
                        {paymentStatus === "processing" ? "Processing..." : paymentStatus === "succeeded" ? "Success" : "Failed"}
                    </h1>

                </div>

            </div>

            <Footer />
        </div >
    );
}

export default OrderPlaced;