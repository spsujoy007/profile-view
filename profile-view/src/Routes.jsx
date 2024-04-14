import {
    createBrowserRouter,
  } from "react-router-dom"
import Home from "./Pages/Home"
import EditProfile from "./Pages/EditProfile"

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
    }
])