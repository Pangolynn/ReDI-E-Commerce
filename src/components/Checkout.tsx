import { SubmitHandler } from "react-hook-form";
import { CartContext } from "../contexts/CartContext.tsx";
import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { Form } from "./Form.tsx";
import { Input } from "./Input.tsx";
import currency from "currency.js";
import { useEffect } from "react";

// all the fields for our checkout form
export type Inputs = {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    creditCardNumber: string;
    expiration: string;
    phone: string;
};

export type Validation = {
    required?: boolean;
    maxLength?: number;
    minLength?: number;
    pattern?: { value: RegExp; message: string };
};

export const Checkout = () => {
    const navigate = useNavigate();
    const { cart } = useContext(CartContext);
    const [total, setTotal] = useState<number>(0);

    // navigate to the checkout page after the user submits
    // send the submitted data and the total
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        navigate("/receipt", {
            state: {
                form: data,
                total: total,
            },
        });
    };

    useEffect(() => {
        // calculate total from cart products
        let total: number = 0;
        cart.forEach((item) => {
            total += item.price * (item.quantity || 1);
        });
        setTotal(total);
    }, [cart]);

    return (
        <div className="container mx-auto">
            <h1 className="my-10 text-center text-2xl sm:text-3xl">Checkout</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mx-4 font-[italiana]">
                {/*Form and Input are custom components*/}
                <Form onSubmit={onSubmit}>
                    <Input
                        validation={{ required: true, maxLength: 100 }}
                        label="First Name"
                        name="firstName"
                        type="text"
                    />
                    <Input
                        validation={{ required: true, maxLength: 100 }}
                        label="Last Name"
                        name="lastName"
                        type="text"
                    />
                    <Input
                        validation={{
                            required: true,
                            maxLength: 100,
                            pattern: {
                                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                message: "Please enter a valid email",
                            },
                        }}
                        label="Email"
                        name="email"
                        type="email"
                    />
                    <Input
                        validation={{ required: true, maxLength: 100 }}
                        label="Address"
                        name="address"
                        type="text"
                    />
                    <Input
                        validation={{ required: true, maxLength: 100 }}
                        label="City"
                        name="city"
                        type="text"
                    />
                    <Input
                        validation={{ required: true, maxLength: 100 }}
                        label="State"
                        name="state"
                        type="text"
                    />
                    <Input
                        validation={{ required: true, maxLength: 30 }}
                        label="Zip Code"
                        name="zipCode"
                        type="text"
                    />
                    <Input
                        validation={{ required: true, maxLength: 100 }}
                        label="Country"
                        name="country"
                        type="text"
                    />
                    <Input
                        validation={{ required: true, maxLength: 30 }}
                        label="Credit Card Number"
                        name="creditCardNumber"
                        type="number"
                    />
                    <Input
                        validation={{ required: true, maxLength: 5 }}
                        label="Expiration"
                        name="expiration"
                        type="text"
                    />
                    <Input
                        validation={{ required: true, maxLength: 20 }}
                        label="Phone"
                        name="phone"
                        type="tel"
                    />

                    <input
                        className="mb-20 rounded cursor-pointer transition active:scale-95 mt-4 w-30 py-2 text-stone-900 bg-sakura hover:bg-rose-200"
                        value="Checkout"
                        type="submit"
                    />
                </Form>

                <div className="container flex-col">
                    <div className="font-[italiana]">Review Your Cart</div>
                    <div className="flex flex-col mt-4 gap-4 outline-3 rounded p-4 bg-sakura outline-sakura">
                        <div className="grid grid-cols-2">
                            <h2>Products</h2>
                            <h2 className="text-end">Price</h2>
                        </div>
                        <hr className="mt-1 mb-4" />

                        {cart.map((product) => {
                            return (
                                <div
                                    key={product.id}
                                    className="grid grid-cols-2"
                                >
                                    <img
                                        className="h-20 "
                                        src={product.thumbnail}
                                    />
                                    <div className="text-end">
                                        <h3>
                                            {product.title} x {product.quantity}
                                        </h3>

                                        <span className="block mt-2">
                                            {currency(
                                                (product.quantity || 1) *
                                                    product.price,
                                            ).format()}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <hr className="mt-10 mb-4 border-gray-300" />
                    <h2 className="mt-4 mb-10 text-end font-bold">
                        Total: {currency(total).format()}
                    </h2>
                </div>
            </div>
        </div>
    );
};
