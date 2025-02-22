import Navbar from "../../components/Navbar/Navbar";
import React, { useState } from "react";
import "./Account.css";
import Footer from "../../components/Footer/Footer";
import { AccountDetails, Addresses, Downloads, Orders } from "./Components";
import useUser from "../../components/Contexts/User/useUser";
import useCart from "../../components/Contexts/Cart/useCart";

function Account() {
    const [selected, setSelected] = useState(0);

    const { logout } = useUser()
    const { clearCart } = useCart()

    return (
        <div>
            <Navbar />

            <div className="account-page-container">
                <div className="account-welcome-container">
                    <h3>Welcome to your Account</h3>

                    <p style={{ width: "90%" }}>
                        We're thrilled to have you here in your personal e-commerce haven.
                        This is your central hub for managing all things related to your
                        shopping experience.
                    </p>
                </div>

                <div className="account-settings-container">
                    <ul className="account-components-buttons">
                        <li
                            className={`account-component-button ${selected === 0 ? "active" : ""}`}
                            onClick={() => setSelected(0)}
                        >
                            Account Details
                        </li>
                        <li
                            className={`account-component-button ${selected === 1 ? "active" : ""}`}
                            onClick={() => setSelected(1)}
                        >
                            Addresses
                        </li>
                        <li
                            className={`account-component-button ${selected === 2 ? "active" : ""}`}
                            onClick={() => setSelected(2)}
                        >
                            Orders
                        </li>
                        <li
                            className={`account-component-button ${selected === 3 ? "active" : ""}`}
                            onClick={() => setSelected(3)}
                        >
                            Downloads
                        </li>
                        <br />
                        <li
                            className={`account-logout-button`}
                            onClick={() => {
                                logout();
                                clearCart();
                            }}
                        >
                            Logout
                        </li>
                    </ul>

                    <div className="account-settings-content">
                        {selected === 0 && <AccountDetails />}
                        {selected === 1 && <Addresses />}
                        {selected === 2 && <Orders />}
                        {selected === 3 && <Downloads />}
                    </div>

                </div>

            </div>

            <Footer />
        </div >
    );
}

export default Account;
