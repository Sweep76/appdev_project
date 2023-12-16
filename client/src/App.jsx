import './App.scss'
import AdminPage from './Components/AdminPage/AdminPage'
import Dashboard from './Components/Dashboard/Dashboard'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'

import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'

//router creation 

const router = createBrowserRouter([
  {
    path: '/',
    element: <div><Login/></div>
  },
  {
    path: '/register',
    element: <div><Register/></div>
  },
  {
    path: '/dashboard',
    element: <div><Dashboard/></div>
  },
  {
    path: '/admin',
    element: <div><AdminPage/></div>
  },
])


function App() {
  
  return (
   <div>
    <RouterProvider router ={router}/>
   </div>
  )
}

export default App
