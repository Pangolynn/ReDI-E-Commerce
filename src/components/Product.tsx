import { ProductType } from "./Products.tsx";
import {useContext} from "react";
import {CartContext} from "../contexts/CartContext.tsx";
import {Link} from "react-router";

type ProductProps = {
    product: ProductType
}

export const Product = ({ product }: ProductProps) => {
    const {addToCart} = useContext(CartContext);

    return (
        <div className="flex flex-col my-10 mx-auto px-2">
            <Link to={`/product-details/${product.id}`}>
                <h2 className="font-extrabold">{product.title}</h2>
            </Link>
            <span className="">{product.rating} / 5 ⭐</span>
            <div className="">
                <Link to={`/product-details/${product.id}`} >
                    <img className="max-w-full h-auto" src={product.thumbnail} alt={product.title} />
                </Link>
            </div>
            <span className="font-bold">${product.price}</span>
            <span><Link to={`/product-details/${product.id}`} className="underline text--700">View Details</Link></span>
            <button
                className="rounded cursor-pointer transition active:scale-95 mt-4 w-30 py-2 text-stone-900 bg-sakura hover:bg-rose-200"
                onClick={() => addToCart(product)}
            >Add to Cart</button>
        </div>
    )
}