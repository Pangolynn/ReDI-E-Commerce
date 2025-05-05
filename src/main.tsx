import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router";
import './index.css'
import App from './App.tsx'
import {Products} from "./components/Products.tsx";
import {ProductDetails} from "./components/ProductDetails.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { index: true, Component: Products},
            {
                path: "product-details/:id",
                Component: ProductDetails
            }
        ]
    },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
