import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom"
import Home from "./Pages/Home"
import EditProfile from "./Pages/EditProfile"

export const routes = createBrowserRouter([
    {
        path: '/',
        element: <EditProfile></EditProfile>,
        children:[
            
        ]
    }
])