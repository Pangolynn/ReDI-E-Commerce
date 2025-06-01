import { useEffect, useState } from "react";
import { ProductType } from "../components/Products.tsx";

export const useFetchProducts = () => {
    const [products, setProducts] = useState<ProductType[]>([]);
    const [selectedProducts, setSelectedProducts] = useState<ProductType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [categories, setCategories] = useState<string[]>([]);

    useEffect(() => {
        // setup an abort controller to cancel fetch request on unmount
        const controller = new AbortController();
        // define the API endpoint
        const API_NAME = "https://dummyjson.com/products";

        const fetchData = async () => {
            try {
                const data = await fetch(API_NAME, {
                    signal: controller.signal,
                });
                // check if we got an OK from the fetch request
                if (!data.ok) {
                    setError(data.status.toString());
                }
                const json = await data.json();
                const jsonProducts = json.products as ProductType[];
                // set our products and initial selected products state
                setProducts(jsonProducts);
                setSelectedProducts(jsonProducts);
                // find out the available product categories and store them
                const categoriesArray: string[] = jsonProducts.map(
                    (product) => product.category,
                );
                setCategories(Array.from(new Set(categoriesArray)));
            } catch (err: unknown) {
                // check the kind of error we got and update the error message state
                if (err instanceof Error && err.name === "AbortError") {
                    console.log("Fetch aborted");
                } else if (err instanceof Error) {
                    console.log(err, "of type ", typeof err);
                    setError(err.message);
                } else {
                    setError("Unknown error occurred");
                }
            } finally {
                setIsLoading(false);
                console.log(error);
            }
        };
        fetchData();

        // cleanup our fetch request on onmount
        return () => controller?.abort();
    }, []);

    return {
        products,
        selectedProducts,
        isLoading,
        categories,
        setSelectedProducts,
    };
};
