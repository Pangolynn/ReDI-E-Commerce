import {ProductType} from "./Products.tsx";
import {useEffect} from "react";

export const Product = (product) => {
    useEffect(() => {
        {console.log(product)}
    })
    product = product.product;

    return (
        <div>

            <h2>{product.title}</h2>
        </div>
    )
}