import React, { createContext, useState } from 'react';
import Cookies from 'js-cookie';
import useApi from '../API/useApi';
import useUser from '../User/useUser';
//import Cart from '../../../Types/Cart';

export const CartContext = createContext(undefined);

const CartContextProvider = ({ children }) => {

    const { loggedIn } = useUser()
    const { fetchCartItems, addCartItem: addCartItemApi, removeCartItem: removeCartItemApi, updateCartItem: updateCartItemApi, emptyCart: emptyCartApi } = useApi();

    const [cart, setCart] = useState()

    const getCartItems = async () => {
        try {
            if (!loggedIn) {
                const cartCookie = Cookies.get('cart');
                if (!cartCookie)
                    return;
                setCart((JSON.parse(cartCookie)));
                return;
            }

            const response = await fetchCartItems();
            setCart(response || null);
        } catch (error) {
            console.log(error)
        }
    }

    const addCartItem = async (item, price) => {
        try {
            if (!loggedIn) {
                const cartCookie = Cookies.get('cart');
                const cartItem = {
                    _id: item,
                    product: item,
                    quantity: 1,
                    total: price * 1
                }
                let cart = { products: [] };
                if (cartCookie)
                    cart = JSON.parse(cartCookie);
                cart.products.push(cartItem);
                cart.total = cart.products.reduce((acc, item) => acc + item.total, 0);
                Cookies.set('cart', JSON.stringify(cart));

                getCartItems();
                return true;
            }
            const response = await addCartItemApi(item);

            setCart(response);
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
                let cart = JSON.parse(cartCookie);

                const products = cart.products.filter(cartItem => cartItem._id !== item);
                cart.products = products;
                cart.total = products.reduce((acc, item) => acc + item.total, 0);
                Cookies.set('cart', JSON.stringify(cart));

                getCartItems();
                return true;
            }

            const cart = await removeCartItemApi(item);

            setCart(cart);
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
                if (!cartCookie)
                    return;
                let cart = JSON.parse(cartCookie);

                const products = cart.products.map(cartItem => {
                    if (cartItem._id === item) {
                        return { ...cartItem, quantity, total: cartItem.total / cartItem.quantity * quantity };
                    }
                    return cartItem;
                });

                cart.products = products;
                cart.total = products.reduce((acc, item) => acc + item.total, 0);
                Cookies.set('cart', JSON.stringify(cart));

                getCartItems();
                return true;
            }
            const cart = await updateCartItemApi(item, quantity);

            setCart(cart);
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
                setCart();
                return true;
            }
            await emptyCartApi();

            setCart();
            return true;
        } catch (error) {
            console.log("🚀 ----------------------------------🚀")
            console.log("🚀 ~ emptyCart ~ error:", error)
            console.log("🚀 ----------------------------------🚀")
            return false;
        }
    }

    const clearCart = () => {
        setCart([]);
    }

    const contextValue = {
        cart,
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