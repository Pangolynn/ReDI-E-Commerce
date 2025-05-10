import {useContext, useEffect} from "react";
import {CartContext} from "../App.tsx";

export const Cart = () => {
   const { cart, addToCart } = useContext(CartContext);

   useEffect(() => {
       console.log(cart);
   },[])

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