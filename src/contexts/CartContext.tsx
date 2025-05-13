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

    // Given a product, add that product to the cart,
    // or increment its quantity if it's already in the cart
    const addToCart = (product: ProductType) => {
        setCart(prev => {
            // Check if product already exists in cart and increment quantity if it does
            const prod: ProductType | undefined = prev.find(p => p.id === product.id);
            if(prod) {
                // put starting quantity at 2 because we already found the product in the cart
                // and quantity will be undefined until we've already added it to the cart once
                return prev.map(p => p.id === product.id ?
                    {...p, quantity: p.quantity ? (p.quantity + 1) : 2}
                    : p)
            } else {
                return [...prev, {...product, quantity: 1}]
            }
        });
    }

    // Given a product id, removes that product from the cart
    const removeFromCart = (id: number) => {
        setCart(prev => prev.filter(p => p.id !== id));
    }

    // Removes all products from the cart
    const removeAllFromCart = () => {
        setCart([] as ProductType[]);
    }

    // given a product id, decrease product quantity by 1
    // or remove from cart if already at 1
    const decreaseQuantity = (id: number) => {
        // find the product in the cart
        const prod: ProductType | undefined = cart.find(p => p.id === id)
        // check if the product quantity is at 1
        if (prod && prod.quantity === 1) {
            // if we are at 1 quantity, reducing it below 1 should remove it from the cart
            removeFromCart(id);
            return;
        }
        // otherwise, remove 1 from the quantity of the specified product
        setCart(prev => prev.map(p => p.id === id ?
            {...p , quantity: (p.quantity && p.quantity > 1) ? (p.quantity - 1) : 0}
            : p));
    }

    // check if we have a cart in localStorage and update cart state if we do
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

    // persist any changes to the cart state to localStorage
    useEffect(() => {
        // if we are loading from localStorage, don't overwrite the localStorage
        // on first render.
        if (loadingLocalStorage) return;
        // After first render, we want cart updates to save to localStorage normally
        // When there are changes to our cart state, update our localStorage
        localStorage.setItem('products', JSON.stringify(cart));
    }, [cart]);

    return <CartContext.Provider value={{cart, addToCart, removeFromCart, removeAllFromCart, decreaseQuantity}}>{children}</CartContext.Provider>
}