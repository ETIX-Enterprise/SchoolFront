import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Route , RouterProvider , createBrowserRouter , createRoutesFromElements } from 'react-router-dom'
import Landing from './components/Landing.tsx'
import LayOut from './LayOut.tsx'



const route = createBrowserRouter(
  createRoutesFromElements(
  <>
    <Route path='' element={<Landing />} />
    <Route path='/Dashboard' element={<LayOut />}>
    <Route  path='' element={<App />} />
    </Route>
    </>

  )
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={route} />
  </StrictMode>,
)
