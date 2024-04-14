import React from 'react';
import useProfileData from './Hooks/useProfileData';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({children}) => {
    const user = JSON.parse(localStorage.getItem('userinfo'))
    const userProfile = useProfileData();
    console.log(user)
    console.log(userProfile)

    const navigate = useNavigate()
    if(user?.username !== userProfile?.username){
        navigate('/signup')
    }
    else{
        return children
    }
};

export default ProtectedRoute;