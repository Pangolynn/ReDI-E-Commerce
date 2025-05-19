import { useForm } from "react-hook-form";
import { createElement } from "react";
import { Inputs } from "./Checkout.tsx";
import { Input } from "./Input.tsx";
import { ReactElement } from "react";
import { SubmitHandler } from "react-hook-form";

type formInputs = {
    children: ReactElement<typeof Input>[];
    onSubmit: SubmitHandler<Inputs>;
};

// Form will only allow inputs as children or throw an error
// Form takes in input elements as children, and a function to handle form submission
// Form passes 'react hook form' register and errors, as well as key and other values to the children
// Returns a form that will use the passed onSubmit function to handle form submission
// with the given children as inputs.
export function Form({ children, onSubmit }: formInputs) {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<Inputs>();

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {Array.isArray(children)
                ? children.map((child) => {
                      // make sure the child is an Input component
                      return child.type == Input
                          ? child.props.name
                              ? createElement(child.type, {
                                    ...{
                                        ...child.props,
                                        register,
                                        // let ts know the names we pass in are
                                        // valid keys for accessing the errors
                                        errors: errors[child.props.name],
                                        key: child.props.name,
                                    },
                                })
                              : child
                          : child;
                  })
                : children}
        </form>
    );
}
