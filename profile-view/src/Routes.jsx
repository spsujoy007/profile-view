import {
    createBrowserRouter,
  } from "react-router-dom"
import Home from "./Pages/Home"
import EditProfile from "./Pages/EditProfile"
import UserProfile from "./Pages/UserProfile"

export const routes = createBrowserRouter([
    {
        path: '/',
        element: <Home></Home>,
        // children:[
        //     {
        //         path: '/editprofile',
        //         element: <EditProfile></EditProfile>
        //     }
        // ]
    },
    {
        path: '/editprofile',
        element: <EditProfile></EditProfile>
    },
    {
        path: '/profile/:username',
        loader:  ({params}) =>  fetch(`http://localhost:5000/profile/${params.username}`),
        element: <UserProfile></UserProfile>
    }
])