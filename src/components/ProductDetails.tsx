import { ProductType } from "./Products.tsx";
import {useEffect} from "react";

type ProductProps = {
    product: ProductType
}
// TODO: route to this based on product id
export const Product = ({ product }: ProductProps) => {
    useEffect(() => {
        console.log(product)
    },[])

    const handleCart = () => {
        // TODO: toggle whether this is in the cart(context)
    }
    return (
        <div className="flex flex-col">
            <h2 className="font-extrabold">{product.title}</h2>
            <img src={product.thumbnail} alt={product.title} />
            <span className="font-semibold">Rating: {product.rating} ⭐</span>
            <span className="italic">{product.category}</span>
            <p>{product.description}</p>

            <span className="font-bold">${product.price}</span>
            <button onClick={handleCart}>Add to Cart</button>
        </div>
    )
}