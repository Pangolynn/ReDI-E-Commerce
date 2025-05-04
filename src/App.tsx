import './App.css'
import {Outlet} from "react-router";

function App() {

  return (
    <div className="app-container">
        <nav className="mt-4 flex justify-between mr-2">
            <div className="mx-4"><a href="/" >ReDI E-Commerce</a></div>
            <ul className="flex space-between gap-4 mr-4">
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
