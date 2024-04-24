import React from 'react';
import useProfileData from './Hooks/useProfileData';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({children}) => {
    const jsonuser = localStorage.getItem('userinfo')
    const user = JSON.parse(jsonuser)
    const userProfile = useProfileData();

    const navigate = useNavigate()
    try{
        if(jsonuser && userProfile.code === 22){
            return navigate('/signup')
        }
        else{
            return children
        }
    }
    finally{

    }
};

export default ProtectedRoute;