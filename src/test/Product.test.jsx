import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { Product } from "../components/Product.js";

const product = {
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
};

beforeEach(() => {
    global.fetch = vi.fn(() =>
        Promise.resolve({
            json: () =>
                Promise.resolve([
                    {
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
                    },
                ]),
        }),
    );
});

describe("Product", () => {
    it("renders product title", async () => {
        render(
            <MemoryRouter>
                <Product product={product} />
            </MemoryRouter>,
        );

        const productTitle = await screen.findByText(
            "Eyeshadow Palette with Mirror",
        );
        expect(productTitle).toBeInTheDocument();
    });
});
