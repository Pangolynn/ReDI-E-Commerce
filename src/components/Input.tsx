// TODO fix error messages for when there is no given message
// Custom input component, takes the register function from
// a react hook form, the name for the input, and the rest of
// the attributes for the input
import { FieldError } from "react-hook-form";
import { Validation } from "./Checkout.tsx";
import { UseFormRegister } from "react-hook-form";
import { FieldValues } from "react-hook-form";

// errors and register are dynamically injected from the Form component
// add them as optional here to avoid typescript errors where the component
// is actually used within the form.
type InputProps = {
    register?: UseFormRegister<FieldValues>;
    name: string;
    label: string;
    errors?: FieldError | undefined;
    validation?: Validation;
    type: string;
};

export function Input({
    register,
    name,
    label,
    errors,
    validation,
    type,
    ...rest
}: InputProps) {
    return (
        <>
            <label className="text-sm italic block">{label}</label>
            <input
                type={type}
                className="block border-2 text-slate-700 border-gray-300 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-sakura"
                {...(register ? register(name, validation) : {})}
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
