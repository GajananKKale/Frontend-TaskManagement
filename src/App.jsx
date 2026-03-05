import { useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider, Outlet, Navigate } from "react-router-dom"
import Navbar from './component/Navbar'
import Footer from './component/Footer'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import AddTask from './pages/Addtask'
import Viewasks from './pages/Viewtask'
import Updatetask from './pages/Updatetask'
import Userprofile from './pages/Userprofile'
import Updateuserprofile from './pages/Updateuserprofile'
import Pagenotfound from './pages/Pagenotfound'

const Layout = ({ token, setToken }) => {
  return (
    <>
      <Navbar token={token} setToken={setToken} />
      <Outlet />
      <Footer />
    </>
  )
}

// ProtectedRoute component: only allow access if logged in
const ProtectedRoutes = ({ children, token }) => {
  if (!token || token === "null" || token === "undefined") {
    return <Navigate to="/login" replace />
  }
  return children
}

// PublicRoute component: only allow access if NOT logged in
const PublicRoute = ({ children, token }) => {
  if (token && token !== "null" && token !== "undefined") {
    return <Navigate to="/" replace />
  }
  return children
}

function App() {
  // App state for auth token
  const [token, setToken] = useState(localStorage.getItem("token"))

  // Router with token passed to Layout and Routes
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout token={token} setToken={setToken} />,
      children: [
        { path: "/", element: <Home /> },
        {
          path: "/login",
          element: (
            <PublicRoute token={token}>
              <Login setToken={setToken} />
            </PublicRoute>
          )
        },
        {
          path: "/register",
          element: (
            <PublicRoute token={token}>
              <Register />
            </PublicRoute>
          )
        },
        {
          path: "/addtask",
          element: (
            <ProtectedRoutes token={token}>
              <AddTask />
            </ProtectedRoutes>
          )
        },
        {
          path: "/viewtask",
          element: (
            <ProtectedRoutes token={token} >
              <Viewasks />
            </ProtectedRoutes>
          )
        },
        {
          path: "/updatetask/:id",
          element: (
            <ProtectedRoutes token={token}>
              <Updatetask />
            </ProtectedRoutes>
          )
        },
        {
          path: "/userprofile/:id",
          element: (
            <ProtectedRoutes token={token}>
              <Userprofile />
            </ProtectedRoutes>
          )
        },
        {
          path: "/updateprofile/:id",
          element: (
            <ProtectedRoutes token={token}>
              <Updateuserprofile />
            </ProtectedRoutes>
          )
        },
        { 
          path: "/logout",
          element: <Navigate to="/login" replace /> 
        },
        {
          path: "*",
          element: <Pagenotfound />
        }
      ]
    }
  ])

  return <RouterProvider router={router} />
}

export default App