import { ProductType } from "./Products.tsx";
import {useEffect} from "react";

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
            <span><a className="underline" href={"/"} >View Details</a></span>
            <button className="rounded mt-2 border-2 w-30 border-indigo-700">Add to Cart</button>
        </div>
    )
}