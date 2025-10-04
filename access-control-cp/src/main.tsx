import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './globals.css'


import App from './App.tsx'
import Login from './routes/Login/index.tsx'


import Error from './routes/Error/index.tsx'

import { createBrowserRouter } from 'react-router-dom'




const router = createBrowserRouter([
  {path: "/login", element: <App/>, errorElement: <Error/>, children: [
    {path: "/login", element: <Login/>}
  ]}
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
