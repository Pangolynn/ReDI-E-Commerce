import { ProductType } from "./Products.tsx";
import {useEffect} from "react";
import {Link} from "react-router";

type ProductProps = {
    product: ProductType
}

export const Product = ({ product }: ProductProps) => {
    useEffect(() => {
        console.log(product)
    },[])

    return (
        <div className="flex flex-col mx-4 my-10 mx-auto px-2">
            <h2 className="font-extrabold">{product.title}</h2>
            <span className="">{product.rating} / 5 ⭐</span>
            <div className="">
                <img className="max-w-full h-auto" src={product.thumbnail} alt={product.title} />
            </div>
            <span className="font-bold">${product.price}</span>
            <span><Link to={`/product-details/${product.id}`} className="underline text--700">View Details</Link></span>
            <button className="rounded mt-2 py-2 w-full text-stone-900 bg-sakura">Add to Cart</button>
        </div>
    )
}