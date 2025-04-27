import React, { createContext } from 'react';
import axios from 'axios';
import useUser from '../User/useUser';
import Cookies from 'js-cookie'

const serverURL = 'http://localhost:5000'

export const ApiContext = createContext(undefined);

const ApiContextProvider = ({ children }) => {

    const { login, authToken, setAuthToken } = useUser()

    const forgotPassword = async (email) => {
        try {
            const response = await axios.post(`${serverURL}/api/forgot-password`, { email })
            if (response.status === 200) {
                return true
            }
            return false
        } catch (error) {
            console.log("🚀 ----------------------------------🚀")
            console.log("🚀 ~ forgotPassword ~ error:", error)
            console.log("🚀 ----------------------------------🚀")
            return false
        }
    }

    const registerUser = async (email, password) => {
        try {
            const response = await axios.post(`${serverURL}/api/signup`, {
                email,
                password,
            })

            return response.data
        } catch (error) {
            if (error.response.status === 409) {
                return { message: 'conflict' }
            }
            console.log("🚀 --------------------------------🚀")
            console.log("🚀 ~ registerUser ~ error:", error)
            console.log("🚀 --------------------------------🚀")
            return { message: 'Server Error' };
        }
    }

    const authenticateUser = async (userName, password) => {
        try {
            const apiResponse = await axios.post(`${serverURL}/api/signin`, { userName, password });

            return apiResponse.data
        } catch (error) {
            if (error.response.status === 401) {
                return { message: 'unauthorized' }
            }
            console.log("🚀 ------------------------------------🚀")
            console.log("🚀 ~ authenticateUser ~ error:", error)
            console.log("🚀 ------------------------------------🚀")
            return { message: 'Server Error' };
        }
    };

    const checkForAuthentication = async () => {
        try {
            const token = Cookies.get('session')
            if (token) {
                const apiResponse = await axios.get(`${serverURL}/api/get-user-data`, { headers: { Authorization: token } })
                if (apiResponse.status === 200) {
                    setAuthToken(token)
                    login({ user: apiResponse.data, token })
                }
                return { message: 'authenticated' }
            };
        } catch (error) {
            if (error.response.status === 401) {
                return { message: 'unauthorized' }
            }
            console.log("🚀 ------------------------------------------🚀")
            console.log("🚀 ~ checkForAuthentication ~ error:", error)
            console.log("🚀 ------------------------------------------🚀")
            return { message: 'Server Error', email: '' };
        }
    };

    const resendOTP = async (email) => {
        try {
            const response = await axios.post(`${serverURL}/api/resend-otp`, { email })
            if (response.status === 200) {
                return true
            }
            return false
        } catch (error) {
            console.log("🚀 ------------------------------🚀")
            console.log("🚀 ~ resendOTP ~ error:", error)
            console.log("🚀 ------------------------------🚀")
            return false
        }
    }

    const verifyOTP = async (email, otp) => {
        try {
            const response = await axios.post(`${serverURL}/api/verify-otp`, { email, otp })
            if (response.status === 200) {
                return response.data
            }
            return false
        } catch (error) {
            console.log("🚀 ------------------------------🚀")
            console.log("🚀 ~ verifyOTP ~ error:", error)
            console.log("🚀 ------------------------------🚀")
            return false
        }
    }

    const updateUser = async ({ userName, name, passwords, email }) => {
        try {
            if (!authToken) {
                return { message: 'unauthorized' }
            }
            const response = await axios.post(`${serverURL}/api/update-user`, { userName, name, passwords, email }, { headers: { Authorization: authToken } })

            return response.data
        } catch (error) {
            if (error.response.status === 403) {
                return { message: error.response.data.message }
            }
            if (error.response.status === 409) {
                return { message: error.response.data.message }
            }
            console.log("🚀 ------------------------------🚀")
            console.log("🚀 ~ updateUser ~ error:", error)
            console.log("🚀 ------------------------------🚀")
            return null
        }
    }

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`${serverURL}/api/get-products`);

            if (response.status === 200 && response.data) {
                return response.data;
            }
        } catch (err) {
            console.log("🚀 -----------------------------🚀")
            console.log("🚀 ~ fetchProducts ~ err:", err)
            console.log("🚀 -----------------------------🚀")
            return null;
        }
    };

    const fetchCartItems = async () => {
        try {
            if (!authToken) {
                return { message: 'unauthorized' }
            }

            const response = await axios.get(`${serverURL}/api/get-cart-items`, { headers: { Authorization: authToken } });
            if (response.status === 200 && response.data) {
                return response.data;
            }
        } catch (err) {
            console.log("🚀 ------------------------------🚀")
            console.log("🚀 ~ fetchCartItems ~ err:", err)
            console.log("🚀 ------------------------------🚀")
            return null;
        }
    };

    const addCartItem = async (item) => {
        try {
            if (!authToken) {
                return { message: 'unauthorized' }
            }
            const response = await axios.post(`${serverURL}/api/add-cart-item`, { item }, { headers: { Authorization: authToken } });

            if (response.status === 200 && response.data) {
                return response.data;
            }
        } catch (err) {
            console.log("🚀 ---------------------------🚀")
            console.log("🚀 ~ addCartItem ~ err:", err)
            console.log("🚀 ---------------------------🚀")
            return null;
        }
    };

    const removeCartItem = async (item) => {
        try {
            if (!authToken) {
                return { message: 'unauthorized' }
            }
            const response = await axios.post(`${serverURL}/api/remove-cart-item`, { item }, { headers: { Authorization: authToken } });

            if (response.status === 200 && response.data) {
                return response.data;
            }
        } catch (err) {
            console.log("🚀 ------------------------------🚀")
            console.log("🚀 ~ removeCartItem ~ err:", err)
            console.log("🚀 ------------------------------🚀")
            return null;
        }
    };

    const updateCartItem = async (item, quantity) => {
        try {
            if (!authToken) {
                return { message: 'unauthorized' }
            }
            const response = await axios.post(`${serverURL}/api/update-cart-item`, { item, quantity }, { headers: { Authorization: authToken } });

            if (response.status === 200 && response.data) {
                return response.data;
            }
        } catch (err) {
            console.log("🚀 ------------------------------🚀")
            console.log("🚀 ~ updateCartItem ~ err:", err)
            console.log("🚀 ------------------------------🚀")
            return null;
        }
    };

    const emptyCart = async () => {
        try {
            if (!authToken) {
                return { message: 'unauthorized' }
            }
            const response = await axios.get(`${serverURL}/api/empty-cart`, { headers: { Authorization: authToken } });

            if (response.status === 200 && response.data) {
                return true;
            }
        } catch (err) {
            console.log("🚀 -------------------------🚀")
            console.log("🚀 ~ emptyCart ~ err:", err)
            console.log("🚀 -------------------------🚀")
            return null;
        }
    };

    const placeOrder = async (order_details) => {
        try {
            if (!authToken) {
                return { message: 'unauthorized' }
            }
            const response = await axios.post(`${serverURL}/api/place-order`, { order_details }, { headers: { Authorization: authToken } });

            if (response.status === 200 && response.data) {
                return response.data;
            }
        } catch (err) {
            console.log("🚀 --------------------------🚀")
            console.log("🚀 ~ placeOrder ~ err:", err)
            console.log("🚀 --------------------------🚀")
            return null;
        }
    };

    const cancelOrder = async (order) => {
        try {
            if (!authToken) {
                return { message: 'unauthorized' }
            }
            const response = await axios.post(`${serverURL}/api/cancel-order`, { order }, { headers: { Authorization: authToken } });

            if (response.status === 200 && response.data) {
                return response.data;
            }
        } catch (err) {
            console.log("🚀 ---------------------------🚀")
            console.log("🚀 ~ cancelOrder ~ err:", err)
            console.log("🚀 ---------------------------🚀")
            return null;
        }
    };


    const initiatePaymentIntent = async (order) => {
        try {
            if (!authToken) {
                return { message: 'unauthorized' }
            }
            const response = await axios.post(`${serverURL}/api/create-payment-intent`, { order }, { headers: { Authorization: authToken } });

            if (response.status === 200 && response.data) {
                return response.data;
            }
        } catch (err) {
            console.log("🚀 ------------------------------🚀")
            console.log("🚀 ~ initiatePaymentIntent ~ err:", err)
            console.log("🚀 ------------------------------🚀")
            return null;
        }
    };

    const getPaymentIntent = async (id) => {
        try {
            if (!authToken) {
                return { message: 'unauthorized' }
            }
            const response = await axios.post(`${serverURL}/api/get-payment-intent`, { id }, { headers: { Authorization: authToken } });

            if (response.status === 200 && response.data) {
                return response.data;
            }
        } catch (err) {
            console.log("🚀 --------------------------------🚀")
            console.log("🚀 ~ getPaymentIntent ~ err:", err)
            console.log("🚀 --------------------------------🚀")
            return null;
        }
    };

    const confirmPaymentIntent = async (paymentIntentId) => {
        try {
            if (!authToken) {
                return { message: 'unauthorized' }
            }
            const response = await axios.post(`${serverURL}/api/confirm-payment-intent`, { paymentIntentId }, { headers: { Authorization: authToken } });

            if (response.status === 200 && response.data) {
                return response.data;
            }
        } catch (err) {
            console.log("🚀 ------------------------------🚀")
            console.log("🚀 ~ confirmPaymentIntent ~ err:", err)
            console.log("🚀 ------------------------------🚀")
            return null;
        }
    }

    const contextValue = {
        forgotPassword,
        registerUser,
        authenticateUser,
        resendOTP,
        verifyOTP,
        checkForAuthentication,
        updateUser,
        fetchProducts,
        fetchCartItems,
        addCartItem,
        removeCartItem,
        updateCartItem,
        emptyCart,
        placeOrder,
        cancelOrder,
        initiatePaymentIntent,
        getPaymentIntent,
        confirmPaymentIntent
    };

    return (
        <ApiContext.Provider value={contextValue}>
            {children}
        </ApiContext.Provider>
    );
};

export default ApiContextProvider;