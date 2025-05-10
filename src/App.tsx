import './App.css'
import {Link, Outlet} from "react-router";
import {createContext, useState} from "react";
import {ProductType} from "./components/Products.tsx";

// Context for the cart state, and state management functions
export const CartContext = createContext({
    cart: [] as ProductType[],
    addToCart: (product: ProductType) : void => {},
   // removeFromCart: () => {},
   // removeAllFromCart: () => {}
})

// Provider for cart state and state management functions
export const CartProvider = ({ children } : {children: React.ReactNode}) => {
    const [cart, setCart] = useState<Array<ProductType>>([]);


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
        console.log("cart", cart);
    }

    return <CartContext.Provider value={{cart, addToCart}}>{children}</CartContext.Provider>
}

function App() {

  return (
      <CartProvider>
        <div className="app-container">
            <nav className="py-4 flex justify-between pr-2 bg-sakura">
                <div className="mx-4"><Link to="/">ReDI E-Commerce</Link></div>
                <ul className="flex space-between gap-4 mr-4 ">
                    <Link to="/">Products</Link>
                    <Link to="/cart">Cart</Link>
                    <li>Checkout</li>
                </ul>
            </nav>
            <Outlet />
        </div>
      </CartProvider>
  )
}

export default App
