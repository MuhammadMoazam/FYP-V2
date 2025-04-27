import React, { createContext, useState } from 'react';
import useApi from '../API/useApi';

export const ProductsContext = createContext(undefined);

const ProductsContextProvider = ({ children }) => {

    const { fetchProducts } = useApi();

    const [products, setProducts] = useState([])

    const getProducts = async () => {
        try {
            const response = await fetchProducts();

            setProducts(response);
            return response;
        } catch (error) {
            console.log(error)
        }
    }

    const contextValue = {
        products,
        getProducts
    };

    return (
        <ProductsContext.Provider value={contextValue}>
            {children}
        </ProductsContext.Provider>
    );
};

export default ProductsContextProvider;