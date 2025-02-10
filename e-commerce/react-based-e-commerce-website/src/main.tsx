import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import NotFoundPage from './pages/NotFound';
import ProductPage from './pages/Product';
import AboutUsPage from './pages/AboutUs';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import client from './ApolloClient';
import { Provider } from 'react-redux';
import { store } from './app/store';
import MiniBasket from './components/MiniBasket';

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
    path: '/basket',
    element: <MiniBasket />
  },

]);

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <StrictMode>
        <RouterProvider router={router} />
      </StrictMode>
    </ApolloProvider>
  </Provider>
);
