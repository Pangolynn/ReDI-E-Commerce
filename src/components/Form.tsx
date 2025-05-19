import { useForm } from "react-hook-form";
import { createElement } from "react";

// TODO Fix typing for form inputs

// Form will only allow inputs as children or throw an error
// Form takes in input elements as children, and a function to handle form submission
// Form passes 'react hook form' register and errors, as well as key and other values to the children
// Returns a form that will use the passed onSubmit function to handle form submission
// with the given children as inputs.
export function Form({ defaultValues, children, onSubmit }) {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({ defaultValues });

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {Array.isArray(children)
                ? children.map((child) => {
                      return child.props.name
                          ? createElement(child.type, {
                                ...{
                                    ...child.props,
                                    register,
                                    errors: errors[child.props.name],
                                    key: child.props.name,
                                },
                            })
                          : child;
                  })
                : children}
        </form>
    );
}
