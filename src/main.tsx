import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Route , RouterProvider , createBrowserRouter , createRoutesFromElements } from 'react-router-dom'
import Landing from './components/Landing.tsx'
import LayOut from './LayOut.tsx'
import Signup from './Auth/Signup.tsx'
import ForgotPassword from './Auth/ForgotPassword.tsx'
import VerifyCode from './Auth/VerifyCode.tsx'
import SetPassword from './Auth/SetPassword.tsx'
import Login from './Auth/Login.tsx'
import Home from './Tabs/Home.tsx'
import Students from './Tabs/Students.tsx'
import Bookings from './Tabs/Bookings.tsx'
import ReportsPage from './Tabs/Reports.tsx'
import Tracking from './Tabs/Tracking.tsx'
import NotificationPage from './Tabs/Notifications.tsx'
import Support from './Tabs/Support.tsx'
import PaymentsDashboard from './Tabs/Payments.tsx'




const route = createBrowserRouter(
  createRoutesFromElements(
  <>
    <Route path='' element={<Landing />} />
    <Route path='/Login' element={<Login />} />
    <Route path='/Signup' element={<Signup />} />
    <Route path='/Forgot-password' element={<ForgotPassword />} />
    <Route path='/Verification' element={<VerifyCode />} />
    <Route path='/Password-reset' element={<SetPassword />}/>
    <Route path='/Dashboard' element={<LayOut />}>
    <Route path='tracking' element={<Tracking />} />
    <Route  path='overview' element={<Home />} />
    <Route path='students' element={<Students />} />
    <Route path='booking' element={<Bookings />} />
    <Route path='payment' element={<PaymentsDashboard />} />
    <Route path='reports' element={<ReportsPage />} />
    <Route path='notifications' element={<NotificationPage />} />
    <Route path='support' element={<Support />} />
    </Route>
    </>

  )
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={route} />
  </StrictMode>,
)
