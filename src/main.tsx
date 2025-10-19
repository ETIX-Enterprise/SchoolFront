import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Route , RouterProvider , createBrowserRouter , createRoutesFromElements } from 'react-router-dom'
import Landing from './components/Landing.tsx'
import LayOut from './LayOut.tsx'
import Signup from './Auth/Signup.tsx'
import ForgotPassword from './Auth/ForgotPassword.tsx'
import VerifyCode from './Auth/VerifyCode.tsx'



const route = createBrowserRouter(
  createRoutesFromElements(
  <>
    <Route path='' element={<Landing />} />
    <Route path='/Signup' element={<Signup />} />
    <Route path='/Forgot-password' element={<ForgotPassword />} />
    <Route path='/Verification' element={<VerifyCode />} />
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
