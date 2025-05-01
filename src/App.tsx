import './App.css'
import {Outlet} from "react-router";

function App() {

  return (
    <div className="app-container">
        <nav className="flex justify-end mr-2">
            <ul className="flex space-between gap-4">
                <li>Products</li>
                <li>Cart</li>
                <li>Checkout</li>
            </ul>
        </nav>
        <Outlet />
    </div>
  )
}

export default App
