import React, { createContext, useState } from 'react';
import Cookies from 'js-cookie';
import useApi from '../API/useApi';
import useUser from '../User/useUser';

export const CartContext = createContext(undefined);

const CartContextProvider = ({ children }) => {

    const { loggedIn } = useUser()
    const { fetchCartItems, addCartItem: addCartItemApi, removeCartItem: removeCartItemApi, updateCartItem: updateCartItemApi, emptyCart: emptyCartApi } = useApi();

    const [cartItems, setCartItems] = useState([])

    const getCartItems = async () => {
        try {
            if (!loggedIn) {
                const cartCookie = Cookies.get('cart');
                if (!cartCookie) {
                    return;
                }
                setCartItems(JSON.parse(cartCookie));
                return;
            }
            const response = await fetchCartItems();

            setCartItems(response);
        } catch (error) {
            console.log(error)
        }
    }

    const addCartItem = async (item) => {
        try {
            if (!loggedIn) {
                const cartCookie = Cookies.get('cart');
                const cartItem = {
                    _id: item,
                    quantity: 1,
                    product: item
                }
                let cart = [];
                if (cartCookie) {
                    cart = JSON.parse(cartCookie);
                }
                cart.push(cartItem);
                Cookies.set('cart', JSON.stringify(cart));
                getCartItems();
                return true;
            }
            const response = await addCartItemApi(item);

            setCartItems([...cartItems, response]);
            return true;
        } catch (error) {
            console.log("🚀 -------------------------------🚀")
            console.log("🚀 ~ addCartItem ~ error:", error)
            console.log("🚀 -------------------------------🚀")
            return false;
        }
    }

    const removeCartItem = async (item) => {
        try {
            if (!loggedIn) {
                const cartCookie = Cookies.get('cart');
                const cart = JSON.parse(cartCookie);
                const newCart = cart.filter(cartItem => cartItem._id !== item);
                Cookies.set('cart', JSON.stringify(newCart));
                getCartItems();
                return true;
            }
            await removeCartItemApi(item);

            setCartItems(cartItems.filter(cartItem => cartItem._id !== item));
            return true;
        } catch (error) {
            console.log("🚀 ----------------------------------🚀")
            console.log("🚀 ~ removeCartItem ~ error:", error)
            console.log("🚀 ----------------------------------🚀")
            return false;
        }
    }

    const updateCartItem = async (item, quantity) => {
        try {
            if (!loggedIn) {
                const cartCookie = Cookies.get('cart');
                const cart = JSON.parse(cartCookie);
                const newCart = cart.map(cartItem => {
                    if (cartItem._id === item) {
                        return { ...cartItem, quantity };
                    }
                    return cartItem;
                });
                Cookies.set('cart', JSON.stringify(newCart));
                getCartItems();
                return true;
            }
            await updateCartItemApi(item, quantity);

            setCartItems(cartItems.map(cartItem => {
                if (cartItem._id === item) {
                    return { ...cartItem, quantity };
                }
                return cartItem;
            }));
            return true;
        } catch (error) {
            console.log("🚀 ----------------------------------🚀")
            console.log("🚀 ~ updateCartItem ~ error:", error)
            console.log("🚀 ----------------------------------🚀")
            return false;
        }
    }

    const emptyCart = async () => {
        try {
            if (!loggedIn) {
                Cookies.remove('cart');
                getCartItems();
                return true;
            }
            await emptyCartApi();

            setCartItems([]);
            return true;
        } catch (error) {
            console.log("🚀 ----------------------------------🚀")
            console.log("🚀 ~ emptyCart ~ error:", error)
            console.log("🚀 ----------------------------------🚀")
            return false;
        }
    }

    const clearCart = () => {
        setCartItems([]);
    }

    const contextValue = {
        cartItems,
        getCartItems,
        addCartItem,
        removeCartItem,
        updateCartItem,
        emptyCart,
        clearCart
    };

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
};

export default CartContextProvider;