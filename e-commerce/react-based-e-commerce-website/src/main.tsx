import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router";
import { Provider } from 'react-redux';
import { store } from './app/store';
import Products from './pages/Products';
import MiniBasket from './components/MiniBasket';
import AboutUs from './pages/AboutUs';
import NotFound from './pages/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Products/>
  },
  {
    path: '/basket',
    element: <MiniBasket/>
  },
  {
    path: '/aboutus',
    element: <AboutUs/>
  },
  {
    path: '*',
    element: <NotFound/>
  }
]);

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </Provider>
);
