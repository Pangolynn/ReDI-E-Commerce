import { useEffect, useState } from "react";
import { ProductType } from "../components/Products.tsx";

export const useFetchProducts = () => {
    const [products, setProducts] = useState<ProductType[]>([]);
    const [selectedProducts, setSelectedProducts] = useState<ProductType[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [categories, setCategories] = useState<string[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const data = await fetch("https://dummyjson.com/products");
                if (!data.ok) {
                    throw new Error("Fetch failed: not OK");
                }
                const json = await data.json();
                const jsonProducts = json.products as ProductType[];
                // set all of the products
                setProducts(jsonProducts);
                // selectedProducts will change based on filters, start with all
                setSelectedProducts(json.products);
                // Get the unique categories from the product data to use as
                // filter options
                const categoriesArray: string[] = jsonProducts.map(
                    (product) => product.category,
                );
                // set the available categories state
                setCategories(Array.from(new Set(categoriesArray)));
                setIsLoading(false);
            } catch (e) {
                if (e instanceof Error) {
                    setIsLoading(false);
                    throw new Error(e.message);
                } else {
                    setIsLoading(false);
                    throw e;
                }
            }
        };
        fetchData();
    }, []);

    return {
        products,
        selectedProducts,
        isLoading,
        categories,
        setSelectedProducts,
    };
};
