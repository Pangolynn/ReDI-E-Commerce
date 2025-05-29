import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Form } from "../components/Form.js";
import { Input } from "../components/Input.js";

describe("Form", () => {
    it("Should render a form element with 2 inputs", () => {
        render(
            <Form>
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
            </Form>,
        );

        let inputCount = screen.getAllByRole("textbox");
        let formCount = screen.getByRole("form", { name: "Checkout Form" });
        expect(inputCount).toHaveLength(2);
        expect(formCount).toBeInTheDocument();
    });
});
