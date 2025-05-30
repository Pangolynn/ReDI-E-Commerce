import { ProductType } from "./Products.tsx";
import { useContext, useState } from "react";
import { CartContext } from "../contexts/CartContext.tsx";
import { Link } from "react-router";
import currency from "currency.js";
import Snackbar from "@mui/material/Snackbar";

type ProductProps = {
    product: ProductType;
};

export const Product = ({ product }: ProductProps) => {
    const { addToCart } = useContext(CartContext);
    // state for snackbar message
    const [open, setOpen] = useState<boolean>(false);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className="flex flex-col my-10 mx-auto px-2">
            <Link to={`/product-details/${product.id}`}>
                <h2 className="font-extrabold">{product.title}</h2>
            </Link>
            <span className="">{product.rating} / 5 ⭐</span>
            <div className="">
                <Link to={`/product-details/${product.id}`}>
                    <img
                        className="max-w-full h-auto"
                        src={product.thumbnail}
                        alt={product.title}
                    />
                </Link>
            </div>
            <span className="font-bold">
                {currency(product.price).format()}
            </span>
            <span>
                <Link
                    to={`/product-details/${product.id}`}
                    className="underline text--700"
                >
                    View Details
                </Link>
            </span>
            <button
                className="rounded cursor-pointer transition active:scale-95 mt-4 w-30 py-2 text-stone-900 bg-sakura hover:bg-rose-200"
                onClick={() => {
                    addToCart(product);
                    setOpen(true);
                }}
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
    );
};
