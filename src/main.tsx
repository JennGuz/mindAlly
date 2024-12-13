import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router";
import './index.css'
import App from './routes/App';
import { Info } from './routes/Info';

let router = createBrowserRouter([
  {
    path: "/",
    Component: App,
  },
  {
    path: "/info",
    Component: Info,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)