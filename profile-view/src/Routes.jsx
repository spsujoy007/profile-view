import {
    createBrowserRouter,
  } from "react-router-dom"
import Home from "./Pages/Home"
import EditProfile from "./Pages/EditProfile"
import UserProfile from "./Pages/UserProfile"
import Signup from "./Pages/signup"
import Login from "./Pages/Login"
import ProtectedRoute from "./ProtectedRoute"

export const routes = createBrowserRouter([
    {
        path: '/',
        element: <Home></Home>,
    },
    {
        path: '/editprofile',
        element: <ProtectedRoute><EditProfile></EditProfile></ProtectedRoute>
    },
    {
        path: '/signup',
        element: <Signup></Signup>
    },
    {
        path: '/login',
        element: <Login></Login>
    },
    {
        path: '/profile/:username',
        loader:  ({params}) =>  fetch(`https://profile-view-be.vercel.app/profile/${params.username}`),
        element: <UserProfile></UserProfile>
    }
])