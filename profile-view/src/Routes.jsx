import {
    createBrowserRouter,
  } from "react-router-dom"
import Home from "./Pages/Home"
import EditProfile from "./Pages/EditProfile"
import UserProfile from "./Pages/UserProfile"
import Signup from "./Pages/signup"
import Login from "./Pages/Login"
import ProtectedRoute from "./ProtectedRoute"
import RankingProfiles from "./Pages/RankingProfiles"
import LikedProfiles from "./Pages/LikedProfiles.jsx"
import FeedbackField from "./Pages/FeedbackField.jsx"

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
        path: '/ranks',
        element: <RankingProfiles></RankingProfiles>
    },
    {
        path: '/feedback',
        element: <FeedbackField></FeedbackField>
    },
    {
        path: '/likedprofiles',
        element: <LikedProfiles></LikedProfiles>
    },
    {
        path: '/profile/:username',
        loader: async ({params}) =>  await fetch(`https://profile-view-be.vercel.app/profile/${params.username}`),
        element: <UserProfile></UserProfile>
    }
])