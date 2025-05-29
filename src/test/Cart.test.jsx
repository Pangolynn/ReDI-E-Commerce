import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Cart } from "../components/Cart.tsx";

describe("Cart", () => {
    it("should render an empty message when there's nothing in the cart", () => {
        render(<Cart />);

        const text = screen.getByText("Cart is Empty");
        expect(text).toBeInTheDocument();
    });
});
