import { ProductType } from "./Products.tsx";
import {useEffect, useState} from "react";
import {useParams} from "react-router";

type ProductProps = {
    product: ProductType
}

// TODO: use passed in product instead of refetching
// Fetches & displays product from API if going directly from URL params
export const ProductDetails = () => {
    const [product, setProduct] = useState<ProductType>({} as ProductType);
    // Get the specific product ID from our url parameters
    const { id } = useParams();

    useEffect(() => {
        // fetch the specific product we want based on the id passed in the url
        const fetchProduct = async () => {
            try {
                const data = await fetch(`https://dummyjson.com/products/${id}`);
                const json = await data.json();
                setProduct(json);
            } catch (e){
                if(e instanceof Error) {
                    throw new Error(e.message);
                } else {
                    throw e;
                }
            }
        }
        fetchProduct();
    },[])

    const handleCart = () => {
        // TODO: toggle whether this is in the cart(context)
    }

    return (
        <div className="px-6 sm:px-0 mb-10">
            <h1 className="text-center my-10 font-extrabold text-2xl sm:text-3xl">Product Details</h1>
            <div className="flex flex-col sm:flex-row items-center justify-around">
                <img className="sm:w-1/3"src={product.thumbnail} alt={product.title} />
                <div className="product-description sm:w-1/2">
                    <h2 className="font-extrabold my-2">{product.title}</h2>
                    <span className="font-semibold">Rating: {product.rating} ⭐</span>
                    <span className="italic ml-2 font-thin">{product.category}</span>
                    <p className="my-2">{product.description}</p>
                    <div className="font-bold">${product.price}</div>
                    <button
                        onClick={handleCart}
                        className="rounded mt-4 w-30 py-2 text-stone-900 bg-sakura hover:bg-rose-200">
                        Add to Cart
                    </button>
                </div>
            </div>

        </div>
    )
}