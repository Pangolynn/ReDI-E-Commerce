import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Input } from "../components/Input.js";

describe("Input", () => {
    it("Should render an input element with the label that's passed in", () => {
        // mock the register function Input needs
        const register = vi.fn();

        // Input needs all of these values to properly render
        const inputProps = {
            register: register,
            name: "firstName",
            label: "First Name",
            errors: null,
            validation: null,
            type: "text",
        };

        render(<Input {...inputProps} />);

        const label = screen.getByText("First Name");
        expect(label).toBeInTheDocument();
    });
});
