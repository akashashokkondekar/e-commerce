import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router";
import { Provider } from 'react-redux';
import { store } from './app/store';
import Products from './pages/Products';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Products/>
  }
]);

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </Provider>
);
