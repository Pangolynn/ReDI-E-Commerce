import './App.css'
import {Link, Outlet} from "react-router";
import {CartProvider} from "./contexts/CartContext.tsx";

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
