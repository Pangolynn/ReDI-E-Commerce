import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";
import { ProductDetails } from "../components/ProductDetails.js";

// mock our API call for a specific product
beforeEach(() => {
    global.fetch = vi.fn(() =>
        Promise.resolve({
            json: () =>
                Promise.resolve({
                    id: 2,
                    title: "Eyeshadow Palette with Mirror",
                    description:
                        "The Eyeshadow Palette with Mirror offers a versatile range of eyeshadow shades for creating stunning eye looks. With a built-in mirror, it's convenient for on-the-go makeup application.",
                    category: "beauty",
                    price: 19.99,
                    rating: 2.86,
                    stock: 34,
                    images: [
                        "https://cdn.dummyjson.com/product-images/beauty/eyeshadow-palette-with-mirror/1.webp",
                    ],
                    thumbnail:
                        "https://cdn.dummyjson.com/product-images/beauty/eyeshadow-palette-with-mirror/thumbnail.webp",
                }),
        }),
    );
});

// clear mock history
afterEach(() => {
    vi.restoreAllMocks();
});

// must use async/await because there is an API call for
// this component
describe("ProductDetails", () => {
    it('should access route with "id" param and display product title', async () => {
        render(
            <MemoryRouter initialEntries={["/product-details/2"]}>
                <Routes>
                    <Route
                        path="/product-details/:id"
                        element={<ProductDetails />}
                    />
                </Routes>
            </MemoryRouter>,
        );

        const productTitle = await screen.findByText(
            "Eyeshadow Palette with Mirror",
        );
        expect(productTitle).toBeInTheDocument();
    });
});
