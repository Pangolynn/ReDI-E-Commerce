import {useEffect, useState} from "react";
import {Product} from "./Product.tsx";

export type ProductType = {
    id: number,
    title: string,
    category: string,
    description: string,
    price: number,
    rating: number,
    thumbnail: string
}

export const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetch('https://dummyjson.com/products');
                if(!data.ok) {
                    throw new Error("Fetch failed: not OK")
                }
                const json = await data.json();
                setProducts(json.products);
                console.log("set products:", json.products);
            } catch (e) {
                if(e instanceof Error) {
                    throw new Error(e.message);
                }
                else {
                    throw e;
                }
            }
        }
        fetchData()
    },[]);


    return (
        <>
            {products.map((product) => (
              <Product key={product.id} product={product} />
            ))}
        </>
    )
}