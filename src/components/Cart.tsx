import {useContext} from "react";
import {CartContext} from "../contexts/CartContext.tsx";

export const Cart = () => {
   const { cart } = useContext(CartContext);

    return (
        <div className="flex flex-col">
            {cart.map((product) => {
                return (
                    <div key={product.id}>
                        <h2>{product.title}</h2>
                        <img className="h-30" src={product.thumbnail} alt={product.title}/>
                        <p>{product.quantity || 1}</p>
                        <span>$100</span>
                    </div>
            )
            })}
        </div>
    )
}