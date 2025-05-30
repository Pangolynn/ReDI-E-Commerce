import { describe, it, expect } from "vitest";
import { Checkout } from "../components/Checkout.js";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router";

describe("Checkout", () => {
    it("should display checkout form input fields", () => {
        render(
            <MemoryRouter initialEntries={["/checkout"]}>
                <Routes>
                    <Route path="checkout" element={<Checkout />} />
                </Routes>
            </MemoryRouter>,
        );

        const firstName = screen.getByTestId("firstName");
        expect(firstName).toBeInTheDocument();

        const email = screen.getByTestId("email");
        expect(email).toBeInTheDocument();
    });
});
