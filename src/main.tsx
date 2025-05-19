import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./index.css";
import App from "./App.tsx";
import { Products } from "./components/Products.tsx";
import { ProductDetails } from "./components/ProductDetails.tsx";
import { Cart } from "./components/Cart.tsx";
import { Checkout } from "./components/Checkout.tsx";
import { Receipt } from "./components/Receipt.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { index: true, Component: Products },
            {
                path: "cart",
                Component: Cart,
            },
            {
                path: "product-details/:id",
                Component: ProductDetails,
            },
            {
                path: "checkout",
                Component: Checkout,
            },
            {
                path: "receipt",
                Component: Receipt,
            },
        ],
    },
]);

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
);
