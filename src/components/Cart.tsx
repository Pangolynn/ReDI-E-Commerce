import { useContext } from "react";
import { CartContext } from "../contexts/CartContext.tsx";
import cartIcon from "../assets/cartIcon.svg";
import { Link } from "react-router";
import currency from "currency.js";

export const Cart = () => {
    const { cart, removeFromCart, removeAllFromCart, decreaseQuantity } =
        useContext(CartContext);
    let total = 0;

    return (
        <>
            <h1 className="text-center my-10 font-extrabold text-3xl">Cart</h1>
            <div className="flex flex-col container m-auto justify-center items-center gap-4">
                {cart.map((product) => {
                    total += product.price * (product.quantity || 1);
                    return (
                        <div className="container" key={product.id}>
                            <div className="w-1/2 mx-auto">
                                <div className="flex justify-between items-center">
                                    <button
                                        aria-label="Remove from cart"
                                        className="text-red-400 rounded cursor-pointer transition active:scale-95 mt-4 w-10 h-10 py-2 hover:bg-rose-200 hover:text-red-600"
                                        onClick={() =>
                                            removeFromCart(product.id)
                                        }
                                    >
                                        X
                                    </button>
                                    <div className="flex flex-col align-middle justify-center items-center">
                                        <h2>{product.title}</h2>
                                        <img
                                            className="h-30"
                                            src={product.thumbnail}
                                            alt={product.title}
                                        />
                                    </div>
                                    <div className="flex flex-col justify-center items-center gap-4 self-start">
                                        <p>Quantity: {product.quantity || 1}</p>
                                        <button
                                            aria-label="Decrease quantity by 1"
                                            onClick={() =>
                                                decreaseQuantity(product.id)
                                            }
                                            className="bg-red-100 rounded text-red-400 hover:text-red-600 px-2 hover:bg-red-200"
                                        >
                                            -
                                        </button>
                                        <span className="cost self-end">
                                            Price:{" "}
                                            {currency(
                                                product.price *
                                                    (product.quantity || 1),
                                            ).format()}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            {cart.length > 1 && (
                                <hr className=" mx-auto mt-2 h-1/2 w-1/2 bg-sakura border-sakura" />
                            )}
                        </div>
                    );
                })}
                {cart.length === 0 ? (
                    <div className="flex-col justify-center align-middle text-center">
                        <div>Cart is Empty</div>
                        <img
                            className="h-40 mt-10"
                            src={cartIcon}
                            alt="cart icon"
                        />
                    </div>
                ) : (
                    <>
                        <div className="flex justify-center items-center">
                            <button
                                aria-label="Remove all from cart"
                                className="text-red-400 hover:text-red-600"
                                onClick={removeAllFromCart}
                            >
                                Remove All Items From Cart
                            </button>
                        </div>
                        <hr className="my-10 h-1/2 w-1/2 " />
                        <div className="flex total">
                            Total: {currency(total).format()}
                        </div>

                        <Link to="/checkout">
                            <button className="mb-20 rounded cursor-pointer transition active:scale-95 mt-4 w-30 py-2 text-stone-900 bg-sakura hover:bg-rose-200">
                                Checkout
                            </button>
                        </Link>
                    </>
                )}
            </div>
        </>
    );
};
