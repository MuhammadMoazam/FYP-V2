import { useContext } from "react";
import { ProductsContext } from "./ProductsContext";

const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProducts must be used within an ProductsProvider');
  }
  return context;
};

export default useProducts;