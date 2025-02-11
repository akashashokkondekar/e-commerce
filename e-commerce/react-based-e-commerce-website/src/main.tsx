import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import NotFoundPage from './pages/NotFound';
import ProductPage from './pages/Product';
import AboutUsPage from './pages/AboutUs';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import client from './../ApolloClient';
import { Provider } from 'react-redux';
import { store } from './app/store';
import Checkout from './pages/Checkout';

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
    element: <Checkout />,
  },
]);

createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <ApolloProvider client={client}>
        <RouterProvider router={router} />
    </ApolloProvider>
  </Provider>
);
