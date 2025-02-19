import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './../ApolloClient';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { createRoot } from 'react-dom/client';
import './index.css';
const NotFoundPage = React.lazy(() => import("./pages/NotFound"));
const ProductPage = React.lazy(() => import("./pages/Product"));
const AboutUsPage = React.lazy(() => import("./pages/AboutUs"));
const CheckoutPage = React.lazy(() => import("./pages/Checkout"));
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ExtendedBasketItem from './pages/ExtendedBasketItem';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ProductPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
  {
    path: '/aboutus',
    element: <AboutUsPage />,
  },
  {
    path: '/checkout',
    element: <CheckoutPage />,
  },
  {
    path: '/extendedbasketitem',
    element: <ExtendedBasketItem />,
  },
]);

createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <ApolloProvider client={client}>
        <RouterProvider router={router} />
    </ApolloProvider>
  </Provider>
);
