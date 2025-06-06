import { useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { CartContext } from "../contexts/CartContext.tsx";
import { useContext } from "react";
import { Inputs } from "./Checkout.tsx";
import heart from "../assets/heart.svg";
import currency from "currency.js";

// Display total paid and customer info after checkout
export const Receipt = () => {
    const navigate = useNavigate();
    // get the state from the checkout component
    const { state } = useLocation();
    const { removeAllFromCart } = useContext(CartContext);

    const [form, setForm] = useState<Inputs>({} as Inputs);
    const [total, setTotal] = useState<number>(0);

    useEffect(() => {
        // if we have no state (someone navigates here directly)
        // return them to checkout
        if (!state) {
            navigate("/checkout");
        } else {
            // if we have state from checkout, set it here
            setForm(state.form);
            setTotal(state.total);
            // empty the cart after checkout
            removeAllFromCart();
        }
    }, [navigate, state]);

    return (
        <>
            <h1 className="text-center my-10 text-3xl">Receipt</h1>
            <h2 className="text-center mt-4">Thank you!</h2>
            <img src={heart} alt="heart" className="mb-10 mx-auto w-10" />
            <div className="w-64 sm:w-96 text-center p-4 rounded mb-10 bg-gray-50 border-sakura flex mx-auto flex-col  gap-4">
                <h3 className="text-center mt-4 font-bold">
                    Your Shipping Information
                </h3>
                <div>
                    Name: {form.firstName} {form.lastName}
                </div>
                <div>Email: {form.email}</div>
                <div>Address: {form.address}</div>
                <div data-testid="city">City: {form.city}</div>
                <div>Zip Code: {form.zipCode}</div>
                <div>Phone: {form.phone}</div>
                <hr className="" />
                <div className="my-4">Total: {currency(total).format()}</div>
            </div>
        </>
    );
};
