import { useState, useEffect } from "react";
import { Elements, ElementsConsumer, PaymentElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import useApi from "components/Contexts/API/useApi";
import { useLocation, useNavigate } from "react-router-dom";
import "./Payment.css"

const stripePromise = loadStripe('[STRIPE_PUBLIC_KEY]');

function Payment({ stripe, elements }) {
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) return;

        const result = await stripe.confirmPayment({
            elements,
            confirmParams: { return_url: "http://localhost:3000/order-placed" },
        });

        if (result.error) {
            console.error("Payment error:", result.error.message);
        }
    };

    return (
        <div className="payment-form">
            <form onSubmit={handleSubmit}>
                <div className="payment-container">
                    <PaymentElement options={{ layout: "tabs" }} />
                    <button type="submit" className="submit-button" disabled={!stripe}>Pay</button>
                </div>
            </form>
        </div>
    );
}

const PaymentWrapper = () => {

    const navigate = useNavigate()
    const location = useLocation()

    const order = location?.state?.order ?? null

    const { initiatePaymentIntent } = useApi();
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        if (!order) {
            navigate("/cart", { replace: true });
            return
        };

        initiatePaymentIntent(order)
            .then(data => {
                console.log(data.clientSecret);
                setClientSecret(data.clientSecret)
            })
            .catch(error => console.error("Error fetching clientSecret:", error));
    }, [initiatePaymentIntent, navigate, order]);

    const options = clientSecret ? { clientSecret } : null;

    return (
        <>
            {clientSecret && (
                <Elements stripe={stripePromise} options={options}>
                    <InjectedPaymentForm />
                </Elements>
            )}
        </>
    );
};

function InjectedPaymentForm() {
    return (
        <ElementsConsumer>
            {({ stripe, elements }) => (
                <Payment stripe={stripe} elements={elements} />
            )}
        </ElementsConsumer>
    );
}

export default PaymentWrapper;