import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import './globals'
import routes from './routes'
import './styles/index.css'

const router = createBrowserRouter(routes)

createRoot(document.getElementById('root')!).render(<RouterProvider router={router} />)
