import { useForm, SubmitHandler } from "react-hook-form";
import {CartContext} from "../contexts/CartContext.tsx";
import {useContext} from "react";
import {useNavigate} from "react-router";

// all the fields for our checkout form
export type Inputs = {
    firstName: string,
    lastName: string,
    email: string,
    address: string,
    city: string,
    state: string,
    zip: string,
    country: string,
    creditCard: string,
    expiration: string,
    phone: string,
}

export const Checkout = () => {
   const navigate = useNavigate();
    const { cart } = useContext(CartContext);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    // navigate to the checkout page after the user submits
    // send the submitted data and the total
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        navigate("/receipt", {
            state: {
                form: data,
                total: total,
            }
        });
    }

    // the customer's total bill amount
    let total: number = 0;

    return (
        <div className="container mx-auto">
            <h1 className="my-10 text-center text-2xl sm:text-3xl">Checkout</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mx-4">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label className="text-sm italic block">First Name</label>
                    <input
                        className="block border-2 text-slate-700 border-gray-300 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-sakura"
                        {...register("firstName", {required: true})}
                    />
                    {errors.firstName && <span className="text-sm block text-red-500">This field is required</span>}
                    <label className="text-sm italic block">Last Name</label>
                    <input
                        className="block border-2 text-slate-700 border-gray-300 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-sakura"
                        {...register("lastName", {required: true})}
                    />
                    {errors.lastName && <span className="text-sm block text-red-500">This field is required</span>}
                    <label className="text-sm italic block">Email</label>
                    <input
                        className="block border-2 text-slate-700 border-gray-300 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-sakura"
                        {...register("email", {required: true})}
                    />
                    {errors.email && <span className="text-sm block text-red-500">This field is required</span>}
                    <label className="text-sm italic block">Address</label>
                    <input
                        className="block border-2 text-slate-700 border-gray-300 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-sakura"
                        {...register("address", {required: true})}
                    />
                    {errors.address && <span className="text-sm block text-red-500">This field is required</span>}
                    <label className="text-sm italic block">City</label>
                    <input
                        className="block border-2 text-slate-700 border-gray-300 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-sakura"
                        {...register("city", {required: true})}
                    />
                    {errors.city && <span className="text-sm block text-red-500">This field is required</span>}
                    <label className="text-sm italic block">State</label>
                    <input
                        className="block border-2 text-slate-700 border-gray-300 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-sakura"
                        {...register("state", {required: true})}
                    />
                    {errors.state && <span className="text-sm block text-red-500">This field is required</span>}
                    <label className="text-sm italic block">Zip Code</label>
                    <input
                        className="block border-2 text-slate-700 border-gray-300 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-sakura"
                        {...register("zip", {required: true})}
                    />
                    {errors.zip && <span className="text-sm block text-red-500">This field is required</span>}
                    <label className="text-sm italic block">Country</label>
                    <input
                        className="block border-2 text-slate-700 border-gray-300 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-sakura"
                        {...register("country", {required: true})}
                    />
                    {errors.country && <span className="text-sm block text-red-500">This field is required</span>}
                    <label className="text-sm italic block">Credit Card</label>
                    <input
                        className="block border-2 text-slate-700 border-gray-300 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-sakura"
                        {...register("creditCard", {required: true})}
                    />
                    {errors.creditCard && <span className="text-sm block text-red-500">This field is required</span>}
                    <label className="text-sm italic block">Expiration</label>
                    <input
                        className="block border-2 text-slate-700 border-gray-300 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-sakura"
                        {...register("expiration", {required: true})}
                    />
                    {errors.expiration && <span className="text-sm block text-red-500">This field is required</span>}
                    <label className="text-sm italic block">Phone</label>
                    <input
                        className="block border-2 text-slate-700 border-gray-300 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-sakura"
                        {...register("phone", {required: true})}
                    />
                    {errors.phone && <span className="text-sm block text-red-500">This field is required</span>}



                    <input className="mb-20 rounded cursor-pointer transition active:scale-95 mt-4 w-30 py-2 text-stone-900 bg-sakura hover:bg-rose-200" value="Checkout" type="submit" />
                </form>
                <div className="container flex-col">
                    <div className="font-[italiana]">Review Your Cart</div>
                    <div className="flex flex-col mt-4 gap-4 outline-3 rounded p-4 bg-sakura outline-sakura">
                        <div className="grid grid-cols-2">
                            <h2>Products</h2>
                            <h2 className="text-end">Price</h2>
                        </div>
                        <hr className="mt-1 mb-4" />

                        {cart.map((product) => {
                        total += product.price * (product.quantity || 1);
                        return (
                            <div key={product.id} className="grid grid-cols-2" >
                                <h3>{product.title} x {product.quantity}</h3>
                                <span className="block text-end">{(product.quantity || 1) * product.price}</span>
                            </div>
                        )
                    })}
                    </div>
                    <hr className="mt-10 mb-4 border-gray-300" />
                    <div className="mt-4 text-end">Total: {total}</div>
                </div>
            </div>
        </div>

    )
}