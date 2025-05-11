import { createContext, useState, useEffect } from "react";
import { ProductType } from "../components/Products.tsx";

// Context for the cart state, and state management functions
export const CartContext = createContext<{
    cart: ProductType[];
    addToCart: (product: ProductType) => void;
}>({
    cart: [],
    addToCart: () => {}
    // removeFromCart: () => {},
    // removeAllFromCart: () => {}
});

// Provider for cart state and state management functions
export const CartProvider = ({ children } : {children: React.ReactNode}) => {
    const [cart, setCart] = useState<Array<ProductType>>([]);
    let loadingLocalStorage: boolean = false;

    const addToCart = (product: ProductType) => {
        console.log("add to cart", product);
        setCart(prev => {
            // Check if product already exists in cart and increment quantity if it does
            const prod: ProductType | undefined = prev.find(p => p.id == product.id);
            if(prod) {
                // put starting quantity at 2 because we already found the product in the cart
                // and quantity will be undefined until we've already added it to the cart once
                return prev.map(p => p.id === product.id ? {...p, quantity: p.quantity ? (p.quantity + 1) : 2} : p)
            } else {
                return [...prev, product]
            }
        });
    }

    // check if we have a cart in local storage
    useEffect(() => {
        const localStorageString: string | null = localStorage.getItem("products");
        const localStorageProducts: ProductType[] = localStorageString ? JSON.parse(localStorageString) : [];
        // if we found products, update our cart state with them
        // and set the loading flag to true, or the useEffect used for
        // saving to localStorage will overwrite the cart with [].
        if(localStorageProducts) {
            setCart(localStorageProducts);
            loadingLocalStorage = true;
        }
    },[]);

    useEffect(() => {
        // if we are loading from localStorage, don't overwrite the localStorage
        // on first render.
        if (loadingLocalStorage) return;
        // After first render, we want cart updates to save to localStorage normally,
        // so set the flag back to false.
        loadingLocalStorage = false;
        // When there are changes to our cart state, update our localStorage
        localStorage.setItem('products', JSON.stringify(cart));
    }, [cart]);

    return <CartContext.Provider value={{cart, addToCart}}>{children}</CartContext.Provider>
}