import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import NotFoundPage from './pages/NotFound.tsx'
import ProductPage from './pages/Product.tsx'
import AboutUsPage from './pages/AboutUs.tsx'
import { createBrowserRouter, RouterProvider } from "react-router";
import { ApolloProvider } from "@apollo/client";
import client from "./ApolloClient";
import { Provider } from 'react-redux';
import { store } from './app/store';
import Checkout from './pages/Checkout.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProductPage />
  },
  {
    path: "*",
    element: <NotFoundPage />
  },
  {
    path: "/aboutus",
    element: <AboutUsPage />
  },
  {
    path: "/checkout",
    element: <Checkout />
  }
]);

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
  <ApolloProvider client={client}>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </ApolloProvider>
  </Provider>
);
