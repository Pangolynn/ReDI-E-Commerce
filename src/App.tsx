import './App.css'
import {Link, Outlet} from "react-router";

function App() {

  return (
    <div className="app-container">
        <nav className="py-4 flex justify-between pr-2 bg-sakura">
            <div className="mx-4"><a href="/" >ReDI E-Commerce</a></div>
            <ul className="flex space-between gap-4 mr-4 ">
                <Link to="/">Products</Link>
                <li>Cart</li>
                <li>Checkout</li>
            </ul>
        </nav>
        <Outlet />
    </div>
  )
}

export default App
