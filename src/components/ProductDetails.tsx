import { ProductType } from "./Products.tsx";
import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { CartContext } from "../contexts/CartContext.tsx";
import currency from "currency.js";
import Snackbar from "@mui/material/Snackbar";
import { NotFound } from "./NotFound.tsx";

// Fetches & displays a specific product from API
export const ProductDetails = () => {
    const [product, setProduct] = useState<ProductType>({} as ProductType);
    // state for snackbar message
    const [open, setOpen] = useState(false);
    // Get the specific product ID from our url parameters
    const { id } = useParams();
    const { addToCart } = useContext(CartContext);
    const API_BASE = "https://dummyjson.com/products/";

    // controllerRef is needed to keep track of the current AbortController instance
    const controllerRef = useRef<AbortController | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        // Check for previous fetch call
        // and abort it.
        if (controllerRef.current) {
            controllerRef.current.abort();
        }

        // create a new AbortController instance so
        // we can abort the fetch if we unmount.
        const controller = new AbortController();
        // update our controllerRef to be our new controller instance
        controllerRef.current = controller;

        // fetch the specific product we want based on the id passed in the url
        const fetchProduct = async () => {
            try {
                const data = await fetch(`${API_BASE}${id}`, {
                    signal: controller.signal,
                });
                if (!data.ok) {
                    setError("Product not found");
                }

                const json = await data.json();
                setProduct(json);
            } catch (e) {
                if (e instanceof DOMException && e.name === "AbortError") {
                    console.log("Fetch Aborted");
                } else if (e instanceof Error) {
                    setError(e.message);
                } else {
                    setError("An Unknown Error Occurred.");
                }
            } finally {
                setLoading(false);
                console.log("Product Details", error);
            }
        };
        fetchProduct();

        return () => controller?.abort();
    }, [id]);

    return (
        <>
            {error ? (
                <NotFound />
            ) : (
                <div className="px-6 sm:px-0 mb-10">
                    <h1 className="text-center my-10 font-extrabold text-2xl sm:text-3xl">
                        Product Details
                    </h1>
                    <div className="flex flex-col sm:flex-row items-center justify-around">
                        {!loading ? (
                            <img
                                className="sm:w-1/3"
                                src={product.thumbnail}
                                alt={product.title}
                            />
                        ) : (
                            <div role="status">
                                <svg
                                    aria-hidden="true"
                                    className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-sakura"
                                    viewBox="0 0 100 101"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                        fill="currentColor"
                                    />
                                    <path
                                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                        fill="currentFill"
                                    />
                                </svg>
                                <span className="sr-only">Loading...</span>
                            </div>
                        )}

                        <div className="product-description sm:w-1/2">
                            <h2 className="font-extrabold mt-2">
                                {product.title}
                            </h2>
                            <div className="italic font-thin capitalize">
                                {product.category}
                            </div>
                            <span className="font-semibold">
                                Rating: {product.rating} ⭐
                            </span>
                            <p className="my-2">{product.description}</p>
                            <div className="font-bold">
                                {currency(product.price).format()}
                            </div>
                            <button
                                onClick={() => {
                                    setOpen(true);
                                    addToCart(product);
                                }}
                                className="rounded cursor-pointer transition active:scale-95 mt-4 w-30 py-2 text-stone-900 bg-sakura hover:bg-rose-200"
                            >
                                Add to Cart
                            </button>
                            <Snackbar
                                open={open}
                                autoHideDuration={4000}
                                onClose={handleClose}
                                message="Product added to cart"
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
