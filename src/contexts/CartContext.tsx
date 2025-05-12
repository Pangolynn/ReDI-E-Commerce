import { createContext, useState, useEffect } from "react";
import { ProductType } from "../components/Products.tsx";

// Context for the cart state, and state management functions
export const CartContext = createContext<{
    cart: ProductType[];
    addToCart: (product: ProductType) => void;
    removeFromCart: (id: number) => void;
    removeAllFromCart: () => void;
    decreaseQuantity: (id: number) => void;
}>({
    cart: [],
    addToCart: () => {},
    removeFromCart: () => {},
    removeAllFromCart: () => {},
    decreaseQuantity: () => {},
});

// Provider for cart state and state management functions
export const CartProvider = ({ children } : {children: React.ReactNode}) => {
    const [cart, setCart] = useState<Array<ProductType>>([]);
    let loadingLocalStorage: boolean = false;

    const addToCart = (product: ProductType) => {
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

    const removeFromCart = (id: number) => {
        console.log('remove from cart', id);
        setCart(prev => prev.filter(p => p.id !== id));
    }

    const removeAllFromCart = () => {
        setCart([] as ProductType[]);
    }

    // const decreaseQuantity = (id: number) => {
    //     console.log('decrease quantity', cart);
    //     const prod: ProductType | undefined = cart.find(p => p.id === id)
    //     console.log(prod.quantity);
    //     if (prod && prod.quantity === 1 || prod && prod.quantity === 0) {
    //         console.log('remove from cart decrease', id);
    //         removeFromCart(id);
    //         return;
    //     }
    //     // setCart(prev => prev.map(p => p.id === id ? {...p , quantity: p.quantity ? (p.quantity - 1) : 0} : p));
    //     console.log(cart);
    // }

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

    return <CartContext.Provider value={{cart, addToCart, removeFromCart,  removeAllFromCart}}>{children}</CartContext.Provider>
}