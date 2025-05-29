import React, { createContext, useContext } from 'react';
import axios from 'axios';
import useUser from '../User/useUser';
import Cookies from 'js-cookie'

const serverURL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const ApiContext = createContext(undefined);

const ApiContextProvider = ({ children }) =>
{

    const { login, updateCart, cartItems, addCartItem: addToCart } = useUser()

    const forgotPassword = async (email) =>
    {
        try
        {
            const response = await axios.post(`${serverURL}/api/forgot-password`, { email })
            if (response.status === 200)
            {
                return true
            }
            return false
        } catch (error)
        {
            console.log("🚀 ----------------------------------🚀")
            console.log("🚀 ~ forgotPassword ~ error:", error)
            console.log("🚀 ----------------------------------🚀")
            return false
        }
    }

    const registerUser = async (email, password) =>
    {
        try
        {
            const response = await axios.post(`${serverURL}/api/signup`, {
                email,
                password,
            })

            return response.data
        } catch (error)
        {
            if (error.response.status === 409)
            {
                return { message: 'conflict' }
            }
            console.log("🚀 --------------------------------🚀")
            console.log("🚀 ~ registerUser ~ error:", error)
            console.log("🚀 --------------------------------🚀")
            return { message: 'Server Error' };
        }
    }

    const authenticateUser = async (userName, password) =>
    {
        try
        {
            const apiResponse = await axios.post(`${serverURL}/api/signin`, { userName, password });

            return apiResponse.data
        } catch (error)
        {
            if (error.response.status === 401)
            {
                return { message: 'unauthorized' }
            }
            console.log("🚀 ------------------------------------🚀")
            console.log("🚀 ~ authenticateUser ~ error:", error)
            console.log("🚀 ------------------------------------🚀")
            return { message: 'Server Error' };
        }
    };

    const checkForAuthentication = async () =>
    {
        try
        {
            const token = Cookies.get('session')
            if (token)
            {
                const apiResponse = await axios.get(`${serverURL}/api/get-user-data`, { headers: { Authorization: token } })
                login({ user: apiResponse.data, token })
            };
        } catch (error)
        {
            if (error.response.status === 401)
            {
                return { message: 'unauthorized' }
            }
            console.log("🚀 ------------------------------------------🚀")
            console.log("🚀 ~ checkForAuthentication ~ error:", error)
            console.log("🚀 ------------------------------------------🚀")
            return { message: 'Server Error', email: '' };
        }
    };

    const resendOTP = async (email) =>
    {
        try
        {
            const response = await axios.post(`${serverURL}/api/resend-otp`, { email })
            if (response.status === 200)
            {
                return true
            }
            return false
        } catch (error)
        {
            console.log("🚀 ------------------------------🚀")
            console.log("🚀 ~ resendOTP ~ error:", error)
            console.log("🚀 ------------------------------🚀")
            return false
        }
    }

    const verifyOTP = async (email, otp) =>
    {
        try
        {
            const response = await axios.post(`${serverURL}/api/verify-otp`, { email, otp })
            if (response.status === 200)
            {
                return response.data
            }
            return false
        } catch (error)
        {
            console.log("🚀 ------------------------------🚀")
            console.log("🚀 ~ verifyOTP ~ error:", error)
            console.log("🚀 ------------------------------🚀")
            return false
        }
    }

    const updateUser = async ({ userName, names, passwords, email }) =>
    {
        try
        {
            const token = Cookies.get('session')
            const response = await axios.post(`${serverURL}/api/update-user`, { userName, names, passwords, email }, { headers: { Authorization: token } })

            return response.data
        } catch (error)
        {
            if (error.response.status === 403)
            {
                return { message: error.response.data.message }
            }
            if (error.response.status === 409)
            {
                return { message: error.response.data.message }
            }
            console.log("🚀 ------------------------------🚀")
            console.log("🚀 ~ updateUser ~ error:", error)
            console.log("🚀 ------------------------------🚀")
            return null
        }
    }

    const fetchProducts = async () =>
    {
        try
        {
            const response = await axios.get(`${serverURL}/api/products`);

            console.log("🚀 ---------------------------------------🚀")
            console.log("🚀 ~ fetchProducts ~ response:", response)
            console.log("🚀 ---------------------------------------🚀")
            if (response.status === 200 && response.data)
            {
                console.log("🚀 -------------------------------------------------🚀")
                console.log("🚀 ~ fetchProducts ~ response.data:", response.data)
                console.log("🚀 -------------------------------------------------🚀")
                return response.data;
            }
        } catch (err)
        {
            console.log("🚀 -----------------------------🚀")
            console.log("🚀 ~ fetchProducts ~ err:", err)
            console.log("🚀 -----------------------------🚀")
            return null;
        }
    };

    const fetchCartItems = async () =>
    {
        try
        {
            const token = Cookies.get('session')
            const response = await axios.get(`${serverURL}/api/cart/get-items`, { headers: { Authorization: token } });

            if (response.status === 200 && response.data)
            {
                return response.data;
            }
        } catch (err)
        {
            console.log("🚀 ------------------------------🚀")
            console.log("🚀 ~ fetchCartItems ~ err:", err)
            console.log("🚀 ------------------------------🚀")
            return null;
        }
    };

    const addCartItem = async (item) =>
    {
        try
        {
            const token = Cookies.get('session')
            const response = await axios.post(`${serverURL}/api/cart/add-item`, { item }, { headers: { Authorization: token } });

            if (response.status === 201 && response.data)
            {
                return response.data;
            }
        } catch (err)
        {
            console.log("🚀 ---------------------------🚀")
            console.log("🚀 ~ addCartItem ~ err:", err)
            console.log("🚀 ---------------------------🚀")
            return null;
        }
    };

    const removeCartItem = async (item) =>
    {
        try
        {
            const token = Cookies.get('session')
            const response = await axios.post(`${serverURL}/api/cart/remove-item`, { item }, { headers: { Authorization: token } });

            if (response.status === 200 && response.data)
            {
                return true;
            }
        } catch (err)
        {
            console.log("🚀 ------------------------------🚀")
            console.log("🚀 ~ removeCartItem ~ err:", err)
            console.log("🚀 ------------------------------🚀")
            return null;
        }
    };

    const updateCartItem = async (item, quantity) =>
    {
        try
        {
            const token = Cookies.get('session')
            const response = await axios.post(`${serverURL}/api/cart/update-item`, { item, quantity }, { headers: { Authorization: token } });

            if (response.status === 200 && response.data)
            {
                return response.data;
            }
        } catch (err)
        {
            console.log("🚀 ------------------------------🚀")
            console.log("🚀 ~ updateCartItem ~ err:", err)
            console.log("🚀 ------------------------------🚀")
            return null;
        }
    };

    const emptyCart = async () =>
    {
        try
        {
            const token = Cookies.get('session')
            const response = await axios.get(`${serverURL}/api/cart/empty`, { headers: { Authorization: token } });

            if (response.status === 200 && response.data)
            {
                return true;
            }
        } catch (err)
        {
            console.log("🚀 -------------------------🚀")
            console.log("🚀 ~ emptyCart ~ err:", err)
            console.log("🚀 -------------------------🚀")
            return null;
        }
    };

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
        emptyCart
    };

    return (
        <ApiContext.Provider value={contextValue}>
            {children}
        </ApiContext.Provider>
    );
};

export default ApiContextProvider;