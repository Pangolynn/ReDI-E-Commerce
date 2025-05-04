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
    const [products, setProducts] = useState<ProductType[]>([]);

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
        <div className="container mx-auto">
        <h1 className="text-center my-10 font-extrabold text-3xl">All Products</h1>
        <div className="grid my-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {products.map((product: ProductType) => (
              <Product key={product.id} product={product} />
            ))}
        </div>
        </div>
    )
}