import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router";
import { Receipt } from "../components/Receipt.tsx";

describe("Receipt", () => {
    it("should render a receipt with the correct city", () => {
        // mock the form sent in from Checkout
        const form = {
            firstName: "Sam",
            lastName: "Simonds",
            city: "Munich",
            phone: "1234567890",
            address: "123 Main St",
            zipCode: "12345",
            email: "test@test.com",
        };

        render(
            <MemoryRouter
                initialEntries={[
                    {
                        pathname: "/receipt",
                        state: {
                            form: form,
                            total: "19.99",
                        },
                    },
                ]}
            >
                <Routes>
                    <Route path="/receipt" element={<Receipt />} />
                </Routes>
            </MemoryRouter>,
        );

        const city = screen.getByTestId("city");
        expect(city).toHaveTextContent("City: Munich");
    });
});
