// TODO fix error messages for when there is no given message
// Custom input component, takes the register function from
// a react hook form, the name for the input, and the rest of
// the attributes for the input
import { FieldError } from "react-hook-form";
import { Validation } from "./Checkout.tsx";
import { UseFormRegister } from "react-hook-form";
import { FieldValues } from "react-hook-form";

type InputProps = {
    register: UseFormRegister<FieldValues>;
    name: string;
    label: string;
    errors: FieldError | undefined;
    validation?: Validation;
};

export function Input({
    register,
    name,
    label,
    errors,
    validation,
    ...rest
}: InputProps) {
    return (
        <>
            <label className="text-sm italic block">{label}</label>
            <input
                className="block border-2 text-slate-700 border-gray-300 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-sakura"
                {...register(name, validation)}
                {...rest}
            />
            {errors?.message && (
                <span className="text-sm block text-red-500">
                    {errors.message}
                </span>
            )}
            {errors && errors?.message?.length == undefined && (
                <span className="text-sm block text-red-500">
                    Please enter a valid {label}
                </span>
            )}
        </>
    );
}
